import os
import shutil
import tempfile

from git import Repo, GitCommandError


ALLOWED_EXTENSIONS = (
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".js",
    ".ts",
    ".go",
    ".cs",
)


def clone_and_read_repo(repo_url: str):

    temp_dir = tempfile.mkdtemp()

    try:
        try:
            Repo.clone_from(repo_url, temp_dir)
        except GitCommandError:
            raise Exception(
                "Unable to clone repository. Check if the repository exists or is public."
            )

        code = ""
        total_chars = 0
        max_chars = 150000
        max_files = 20
        files_read = 0

        for root, _, files in os.walk(temp_dir):

            for file in files:

                if files_read >= max_files:
                    break

                if file.endswith(ALLOWED_EXTENSIONS):

                    path = os.path.join(root, file)

                    try:
                        with open(
                            path,
                            "r",
                            encoding="utf-8",
                            errors="ignore"
                        ) as f:

                            content = f.read()

                            if total_chars + len(content) > max_chars:
                                continue

                            code += f"\n\n# FILE: {file}\n\n"
                            code += content

                            total_chars += len(content)
                            files_read += 1

                    except Exception:
                        pass

        return code

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)