import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <Editor
        height="600px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 15,
          minimap: {
            enabled: true,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          roundedSelection: true,
          padding: {
            top: 16,
          },
        }}
      />
    </div>
  );
}