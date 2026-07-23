import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AIReview() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(`print("Hello World")`);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeCode = async () => {
    setLoading(true);

    try {
      const response = await api.post("/review", {
  title: "Quick AI Review",
  language,
  code,
});


      setResult(response.data);
      toast.success("AI review completed successfully!");
    } catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        console.log(err.response.data);
        toast.error(err.response.data.detail);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        🤖 AI Code Review
      </h1>

      <div className="flex items-center gap-4 mb-6">

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>

        <button
          onClick={analyzeCode}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 transition-all rounded-xl px-6 py-3 font-semibold"
        >
          {loading ? (
            <span className="animate-pulse">
              🤖 Analyzing...
            </span>
          ) : (
            "🚀 Analyze Code"
          )}
        </button>

      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">

        <Editor
          height="600px"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 15,
            automaticLayout: true,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            roundedSelection: true,
          }}
        />

      </div>

      {result && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-8">
            AI Analysis Result
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-5 shadow-lg">
              <p className="text-slate-200">
                Overall Score
              </p>

              <h1 className="text-5xl font-bold mt-3">
                {result.score}
              </h1>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">

              <p className="text-slate-400">
                🐞 Bugs
              </p>

              <h1 className="text-4xl font-bold text-red-400 mt-3">
                {result.bugs}
              </h1>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">

              <p className="text-slate-400">
                🔒 Security
              </p>

              <div className="mt-3 h-3 bg-slate-700 rounded-full">

                <div
                  className="h-3 bg-green-500 rounded-full"
                  style={{
                    width: `${result.security_score * 10}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-2xl font-bold">
                {result.security_score}/10
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">

              <p className="text-slate-400">
                ⚡ Performance
              </p>

              <div className="mt-3 h-3 bg-slate-700 rounded-full">

                <div
                  className="h-3 bg-yellow-500 rounded-full"
                  style={{
                    width: `${result.performance_score * 10}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-2xl font-bold">
                {result.performance_score}/10
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">

              <p className="text-slate-400">
                ⭐ Quality
              </p>

              <div className="mt-3 h-3 bg-slate-700 rounded-full">

                <div
                  className="h-3 bg-cyan-500 rounded-full"
                  style={{
                    width: `${result.quality_score * 10}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-2xl font-bold">
                {result.quality_score}/10
              </p>

            </div>

          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-5">
              🧠 Detailed AI Review
            </h2>

            <pre className="whitespace-pre-wrap text-slate-300 leading-8 text-[15px]">
              {result.review}
            </pre>

          </div>

        </div>
      )}

    </div>
  );
}