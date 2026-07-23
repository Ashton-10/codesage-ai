import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export function ScoreChart({ reviews }) {
  const data = {
    labels: reviews.map((_, i) => `Review ${i + 1}`),
    datasets: [
      {
        label: "Score",
        data: reviews.map((r) => r.score),
        borderColor: "#6366F1",
        backgroundColor: "#6366F1",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
}

export function LanguageChart({ reviews }) {
  const count = {};

  reviews.forEach((r) => {
    count[r.language] = (count[r.language] || 0) + 1;
  });

  const data = {
    labels: Object.keys(count),
    datasets: [
      {
        data: Object.values(count),
      },
    ],
  };

  return <Doughnut data={data} />;
}