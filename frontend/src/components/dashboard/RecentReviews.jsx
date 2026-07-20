export default function RecentReviews() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

      <h2 className="text-xl font-semibold mb-6">
        Recent Reviews
      </h2>

      <div className="space-y-4">

        <div className="bg-slate-800 p-4 rounded-xl">
          Python Project Review
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          Java Review
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          C++ Review
        </div>

      </div>

    </div>
  );
}