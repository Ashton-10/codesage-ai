import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  ScoreChart,
  LanguageChart,
} from "../components/dashboard/ReviewChart";

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    const res = await api.get("/review/history");
    setReviews(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const stats = useMemo(() => {
    const total = reviews.length;

    if (total === 0) {
      return {
        total: 0,
        avgScore: 0,
        totalBugs: 0,
        avgSecurity: 0,
        avgPerformance: 0,
      };
    }

    return {
      total,
      avgScore: (
        reviews.reduce((a, b) => a + b.score, 0) / total
      ).toFixed(1),

      totalBugs: reviews.reduce(
        (a, b) => a + b.bugs,
        0
      ),

      avgSecurity: (
        reviews.reduce(
          (a, b) => a + b.security_score,
          0
        ) / total
      ).toFixed(1),

      avgPerformance: (
        reviews.reduce(
          (a, b) => a + b.performance_score,
          0
        ) / total
      ).toFixed(1),
    };
  }, [reviews]);
  if (loading) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <LoadingSpinner text="Loading Dashboard..." />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        📊 Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <Card
          title="Reviews"
          value={stats.total}
        />

        <Card
          title="Average Score"
          value={stats.avgScore}
        />

        <Card
          title="Total Bugs"
          value={stats.totalBugs}
        />

        <Card
          title="Security"
          value={`${stats.avgSecurity}/10`}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-5">
            Score Trend
          </h2>

          <ScoreChart reviews={reviews} />
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-5">
            Languages Used
          </h2>

          <LanguageChart reviews={reviews} />
        </div>

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
      <p className="text-slate-400">{title}</p>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
}