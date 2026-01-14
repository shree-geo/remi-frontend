import { StatsCard } from "@/components/molecules/statcard/StatsCard";
import { AlertTriangle, CheckCircle, FolderOpen, Users } from "lucide-react";
import { DashboardStats } from "../definitions/type";

export default function Stats({ data: stats }: { data: DashboardStats }) {
  return (
    <>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={{
            tKey: "stats.totalRegistered",
            ns: "dashboard",
          }}
          value={stats.totalRegistered}
          icon={<Users color="green" className="h-5 w-5" />}
          description="All time registrations"
        />
        <StatsCard
          title={{
            tKey: "stats.cases",
            ns: "dashboard",
          }}
          value={stats.activeCases}
          icon={<FolderOpen color="green" className="h-5 w-5  " />}
          description="Currently being processed"
        />
        <StatsCard
          title={{
            tKey: "stats.closedCases",
            ns: "dashboard",
          }}
          value={stats.closedCases}
          icon={<CheckCircle color="green" className="h-5 w-5" />}
          description="Successfully completed"
        />
        <StatsCard
          title={{
            tKey: "stats.overdueFollowUps",
            ns: "dashboard",
          }}
          value={stats.overdueFollowUps}
          icon={<AlertTriangle color="green" className="h-5 w-5" />}
          description="Require attention"
        />
      </div>
    </>
  );
}
