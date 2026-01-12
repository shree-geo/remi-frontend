import STranslation from "@/components/molecules/translations/STranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/modules/components/footer";
import Header from "@/modules/components/header";
import ForgetPasswordForm from "./forgetPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <Header />
        <Card>
          <CardHeader>
            <CardTitle>
              <STranslation
                tKey="title"
                ns="forgot-password"
                className="text-xl"
              />
            </CardTitle>
            <CardDescription>
              <STranslation
                tKey="description"
                ns="forgot-password"
                className="text-xs"
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgetPasswordForm />
          </CardContent>
        </Card>
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
