import { useState } from "react";

import CodeEditor from "../components/review/CodeEditor";
import AnalyzeButton from "../components/review/AnalyzeButton";
import UploadBox from "../components/review/UploadBox";

import { analyzeCode } from "../services/review";

export default function AIReview() {
  const [code, setCode] = useState(`# Write your code here

def hello():
    print("Hello CodeSage AI")
`);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function analyze() {
    try {
      setLoading(true);

      const response = await analyzeCode(code);

      setResult(response);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  function uploadFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setCode(event.target.result);
    };

    reader.readAsText(file);
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        AI Code Review
      </h1>

      <UploadBox onUpload={uploadFile} />

      <CodeEditor
        code={code}
        setCode={setCode}
      />

      <AnalyzeButton
        loading={loading}
        onClick={analyze}
      />

      {result && (
        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-2xl font-bold">
              AI Score
            </h2>

            <p className="text-6xl text-indigo-400 mt-4">
              {result.score}
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-2xl font-bold">
              Metrics
            </h2>

            <p>Security: {result.security}</p>
            <p>Performance: {result.performance}</p>
            <p>Quality: {result.quality}</p>
            <p>Complexity: {result.complexity}</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              AI Suggestions
            </h2>

            <ul className="space-y-3">
              {result.suggestions.map((item, index) => (
                <li key={index}>
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}