import QuickAction from "./components/QuickAction";
import RecentCases from "./components/RecentCases";
import State from "./components/Stats";
import Vulnerability from "./components/Vulnerability";
import { mockDashboardStats } from "./constant/data";

export default function Dashboard() {
  const stats = mockDashboardStats;
  return (
    <>
      <State data={stats} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Vulnerability data={stats} />
        <RecentCases />
      </div>
      <QuickAction />
    </>
  );
}
