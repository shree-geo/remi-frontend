"use client";

import InputElement from "@/components/molecules/Form/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function UserForm() {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>
            <>User Form</>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
            )}
          >
            <InputElement
              label={{
                tKey: "user.form.firstNameLabel",
                ns: "settings",
              }}
              error={{
                tKey: "user.form.firstNameError",
                ns: "settings",
              }}
              helper={{
                tKey: "user.form.firstNameHelper",
                ns: "settings",
              }}
              id="first_name"
              name="first_name"
              required
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
