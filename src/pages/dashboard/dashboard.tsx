import { FC } from "react";
import BarChartDashboard from "@/components/app/dashboard/bar-chart-dashboard";
import AveragesComponent from "@/components/app/dashboard/averages-component";

const Dashboard: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <AveragesComponent />
      <BarChartDashboard />
    </div>
  );
};

export default Dashboard;
