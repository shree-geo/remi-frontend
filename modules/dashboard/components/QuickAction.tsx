import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function QuickAction() {
  return (
    <>
      <Card
        className={cn(
          "group relative mt-3 lg:col-span-2 overflow-hidden rounded-xl border bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        )}
      >
        <CardHeader>
          <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-black">Register New Returnee</Button>
            <Button variant="outline">View All Cases</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
