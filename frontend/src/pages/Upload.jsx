import { useState } from "react";
import api from "../services/api";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("python");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a file.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("language", language);
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await api.post("/review/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        📂 Upload Code Review
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl">

        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded mb-4"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-slate-800 p-3 rounded mb-4"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        <button
          onClick={uploadFile}
          className="bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700"
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>

      </div>

      {result && (
        <div className="mt-8 bg-slate-900 rounded-xl p-6">

          <h2 className="text-3xl font-bold mb-6">
            Upload Review
          </h2>

          <div className="bg-slate-800 rounded p-6 whitespace-pre-wrap">
            {result.review}
          </div>

        </div>
      )}

    </div>
  );
}