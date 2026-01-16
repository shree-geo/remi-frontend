import STranslation from "@/components/molecules/translations/STranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
        </CardHeader>
        <Separator />
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
