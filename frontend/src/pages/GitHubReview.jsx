import { useState } from "react";
import api from "../services/api";

export default function GitHubReview() {
  const [title, setTitle] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeRepo = async () => {
    setLoading(true);

    try {
      const response = await api.post("/review/github", {
        title,
        repo_url: repoUrl,
      });

      setResult(response.data);
    } catch (err) {
      console.error("GitHub Review Error:", err);

      if (err.response) {
        alert(err.response.data.detail || JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        🌐 GitHub Repository Review
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl">

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none"
        />

        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 mb-6 outline-none"
        />

        <button
          onClick={analyzeRepo}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Analyzing Repository..." : "Analyze Repository"}
        </button>

      </div>

      {result && (
        <div className="mt-8 bg-slate-900 rounded-xl p-6">

          <h2 className="text-3xl font-bold mb-6">
            Repository Review
          </h2>

          <div className="grid grid-cols-5 gap-4 mb-6">

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">Score</p>
              <h1 className="text-3xl font-bold">{result.score}</h1>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">Bugs</p>
              <h1 className="text-3xl font-bold">{result.bugs}</h1>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">Security</p>
              <h1 className="text-3xl font-bold">
                {result.security_score}
              </h1>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">Performance</p>
              <h1 className="text-3xl font-bold">
                {result.performance_score}
              </h1>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-slate-400">Quality</p>
              <h1 className="text-3xl font-bold">
                {result.quality_score}
              </h1>
            </div>

          </div>

          <div className="bg-slate-800 rounded-xl p-6 whitespace-pre-wrap leading-7">
            {result.review}
          </div>

        </div>
      )}

    </div>
  );
}