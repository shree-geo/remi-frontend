import Title from "@/components/molecules/title";
import STranslation from "@/components/molecules/translations/STranslation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockReturnees } from "../constant/data";

export default function RecentCases() {
  return (
    <>
      <Card
        className={cn(
          "group relative lg:col-span-2 overflow-hidden rounded-xl border bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium  ">
            <Title size="h4">
              <STranslation tKey="recentCases.title" ns="dashboard" />
            </Title>
          </CardTitle>
          <Button className="bg-black">Button</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockReturnees?.map((returnee) => (
              <Card
                key={returnee.id}
                className="transition-colors hover:bg-muted/50"
              >
                <CardContent className="flex  justify-between ">
                  {/* Left side */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {`${returnee?.firstName?.[0] ?? ""}${
                          returnee?.lastName?.[0] ?? ""
                        }`}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">
                        {returnee.firstName} {returnee.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {returnee.address?.district},{" "}
                        {returnee.address?.province}
                      </p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-orange-200 text-orange-900"
                    >
                      {returnee.vulnerabilityLevel || "Medium"}
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="bg-green-200 text-green-900"
                    >
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
