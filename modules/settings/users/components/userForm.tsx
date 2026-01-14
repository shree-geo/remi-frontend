import { DatePickerAD } from "@/components/molecules/Form/DateElements/DatePickerAD/DatePickerAD";
import InputElement from "@/components/molecules/Form/Input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import UserFormWrapper from "./formWrapper";

export default function UserForm() {
  return (
    <UserFormWrapper>
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
              name="first_name"
              required
            />
            <DatePickerAD />
          </div>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button type="submit">Save</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </UserFormWrapper>
  );
}
