import { Sparkles } from "lucide-react";

export default function AnalyzeButton({
  onClick,
  loading,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-3"
    >
      <Sparkles size={20} />

      <LoadingSpinner text="Loading Profile..." />
    </button>
  );
}