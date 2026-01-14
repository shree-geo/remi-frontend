import STranslation from "@/components/molecules/translations/STranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgetPasswordForm from "../forgot-password/components/forgetPasswordForm";

const ChangePassword = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <STranslation
              tKey="title"
              ns="change-password"
              className="text-xl"
            />
          </CardTitle>
          <CardDescription>
            <STranslation
              tKey="description"
              ns="change-password"
              className="text-xs"
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgetPasswordForm />
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
