import { StatCard } from "@/components/molecules/statcard/StateCard";
import { AlertTriangle, CheckCircle, FolderOpen, Users } from "lucide-react";
import { DashboardStats } from "../definitions/type";

export default function State({ data: stats }: { data: DashboardStats }) {
  return (
    <>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Registered"
          value={stats.totalRegistered}
          icon={<Users color="green" className="h-5 w-5" />}
          description="All time registrations"
        />
        <StatCard
          title="Active Cases"
          value={stats.activeCases}
          icon={<FolderOpen color="green" className="h-5 w-5  " />}
          description="Currently being processed"
        />
        <StatCard
          title="Closed Cases"
          value={stats.closedCases}
          icon={<CheckCircle color="green" className="h-5 w-5" />}
          description="Successfully completed"
        />
        <StatCard
          title="Overdue Follow-ups"
          value={stats.overdueFollowUps}
          icon={<AlertTriangle color="green" className="h-5 w-5" />}
          description="Require attention"
        />
      </div>
    </>
  );
}
