import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function History() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter((review) => {
      const title = review.title?.toLowerCase() || "";
      const language = review.language?.toLowerCase() || "";

      return (
        title.includes(search.toLowerCase()) ||
        language.includes(search.toLowerCase())
      );
    });

    setFilteredReviews(filtered);
  }, [search, reviews]);

  const fetchHistory = async () => {
  try {
    const response = await api.get("/review/history");
    setReviews(response.data);
    setFilteredReviews(response.data);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load history");
  } finally {
    setLoading(false);
  }
};
const downloadPDF = async (id) => {
  try {
    const response = await api.get(`/review/${id}/pdf`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `review_${id}.pdf`);

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

    toast.success("PDF downloaded successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to download PDF");
  }
};
  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await api.delete(`/review/${id}`);

      toast.success("Review deleted successfully!");

      fetchHistory();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  };
  if (loading) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <LoadingSpinner text="Loading History..." />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        📜 Review History
      </h1>

      <input
        type="text"
        placeholder="🔍 Search by title or language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-8 p-4 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="space-y-4">

        {filteredReviews.length === 0 ? (
          <div className="text-center text-slate-400 mt-10">
            No reviews found.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-900 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between border border-slate-800 shadow-lg hover:border-indigo-500 transition-all"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {review.title}
                </h2>

                <p className="text-slate-400 mt-1 capitalize">
                  {review.language}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">

                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Score: {review.score}
                  </span>

                  <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    🐞 Bugs: {review.bugs}
                  </span>

                  <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                    🔒 Security: {review.security_score}/10
                  </span>

                  <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm font-semibold">
                    ⚡ Performance: {review.performance_score}/10
                  </span>

                  <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ Quality: {review.quality_score}/10
                  </span>

                </div>
              </div>

              <div className="flex gap-3 mt-6 md:mt-0">

                <button
  onClick={() => downloadPDF(review.id)}
  className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold transition"
>
  📄 PDF
</button>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-semibold transition"
                >
                  🗑 Delete
                </button>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}