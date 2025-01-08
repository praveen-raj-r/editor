import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartArea, Table2 } from "lucide-react";
import { FC } from "react";
import AveragesChart from "./averages-chart";
import AveragesTable from "./averages-table";

const AveragesComponent: FC = () => {
  return (
    <Tabs defaultValue="chart">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Averages Chart - Live</CardTitle>

            <CardDescription>Showing Overall Shift Insights</CardDescription>
          </div>
          <div>
            <div className="flex items-center px-4 py-2">
              <TabsList className="ml-auto">
                <TabsTrigger value="chart">
                  <div className="flex gap-3 items-center justify-center">
                    <ChartArea className="size-5" /> Chart
                  </div>
                </TabsTrigger>
                <TabsTrigger value="table">
                  <div className="flex gap-3 items-center justify-center">
                    <Table2 className="size-5" /> Table
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <TabsContent value="chart" className="m-0">
            <AveragesChart />
          </TabsContent>
          <TabsContent value="table" className="m-0">
            <AveragesTable />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default AveragesComponent;
