import STranslation from "@/components/molecules/translations/STranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@modules/login/components/footer";
import Header from "@modules/login/components/header";
import LoginForm from "@modules/login/components/loginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <Header />
        <Card>
          <CardHeader>
            <CardTitle>
              <STranslation tKey="title" ns="login" />
            </CardTitle>
            <CardDescription>
              <STranslation tKey="description" ns="login" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
