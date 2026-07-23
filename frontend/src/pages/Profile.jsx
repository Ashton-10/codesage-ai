import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userRes = await api.get("/auth/me");
      setUser(userRes.data);

      const reviewRes = await api.get("/review/history");
      setReviews(reviewRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  const totalReviews = reviews.length;

  const averageScore =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + r.score, 0) /
          totalReviews
        ).toFixed(1)
      : 0;

  const totalBugs = reviews.reduce(
    (sum, r) => sum + r.bugs,
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <LoadingSpinner text="Loading Profile..." />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        👤 My Profile
      </h1>

      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {user.username}
            </h2>

            <p className="text-slate-400 text-lg">
              {user.email}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-800 rounded-xl p-6">
            <p className="text-slate-400">
              Reviews
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {totalReviews}
            </h1>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <p className="text-slate-400">
              Average Score
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {averageScore}
            </h1>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <p className="text-slate-400">
              Total Bugs
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {totalBugs}
            </h1>
          </div>

        </div>

        <button
          onClick={logout}
          className="mt-10 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

    </div>
  );
}