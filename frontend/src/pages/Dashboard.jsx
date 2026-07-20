import { useEffect, useState } from "react";

import {
  Shield,
  Gauge,
  Star,
  FileCode,
} from "lucide-react";

import DashboardCard from "../components/dashboard/DashboardCard";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import ReviewChart from "../components/dashboard/ReviewChart";
import RecentReviews from "../components/dashboard/RecentReviews";

import { getCurrentUser } from "../services/dashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const me = await getCurrentUser();
        setUser(me);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }

    loadUser();
  }, []);

  return (
    <div>
      <WelcomeCard
        username={user?.username || "Developer"}
      />

      <div className="grid grid-cols-4 gap-6">
        <DashboardCard
          title="AI Score"
          value="94%"
          icon={Star}
          color="text-yellow-400"
        />

        <DashboardCard
          title="Security"
          value="9.6"
          icon={Shield}
          color="text-green-400"
        />

        <DashboardCard
          title="Performance"
          value="9.3"
          icon={Gauge}
          color="text-blue-400"
        />

        <DashboardCard
          title="Reviews"
          value="28"
          icon={FileCode}
          color="text-purple-400"
        />
      </div>

      <ReviewChart />

      <RecentReviews />
    </div>
  );
}