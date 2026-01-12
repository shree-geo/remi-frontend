import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats, mockReturnees } from "../constant/data";
import State from "./Stats";
import Vulnerability from "./Vulnerability";

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <>
      <State data={stats} />
      {/* grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Vulnerability Breakdown */}
        <Vulnerability data={stats} />

        {/* Recent Cases */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium  ">
              Recent Cases
            </CardTitle>
            <Button color="primary">Button</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReturnees?.map((returnee) => (
                <>
                  <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {" "}
                          {`${returnee?.firstName?.[0] ?? ""}${
                            returnee?.lastName?.[0] ?? ""
                          }`}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{`${returnee?.firstName} ${returnee?.lastName}`}</p>
                        <p className="text-xs text-muted-foreground">
                          {` ${returnee?.address?.district},${returnee?.address?.province}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-300">
                        {returnee?.vulnerabilityLevel || "medium"}
                      </Badge>
                      <Badge className="bg-green-300">Completed</Badge>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
