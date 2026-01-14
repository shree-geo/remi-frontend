import STranslation from "@/components/molecules/translations/STranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangePasswordForm from "./components/changePasswordForm";

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
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
