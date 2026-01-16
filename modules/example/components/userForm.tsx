import DatePickerAD from "@/components/molecules/Form/DateElements/DatePickerAD/DatePickerAD";
import DatePickerBS from "@/components/molecules/Form/DateElements/DatePickerBS/DatePickerBS";
import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";
import TextAreaElement from "@/components/molecules/Form/textArea";
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
      <Card className="">
        <CardHeader>
          <CardTitle>Example Form</CardTitle>
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
              name="first_name"
              required
            />
            <DatePickerAD id="date" name="date" required />
            <DatePickerBS
              id="bs_date"
              name="bs_date"
              label={{
                tKey: "bsdate",
              }}
              required
            />
            <TextAreaElement
              label={{
                tKey: "user.form.bioLabel",
                ns: "settings",
              }}
              name="bio"
              required
            />
            <SelectBox
              id="select"
              name="select"
              options={[{ label: "sth", value: "sth" }]}
            />
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
