export default function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="w-14 h-14 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin"></div>

      <p className="mt-5 text-slate-400 text-lg">
        {text}
      </p>

    </div>
  );
}