"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import DemoAccounts from "./components/demoAccounts";
import Footer from "./components/footer";
import Header from "./components/header";
import LoginForm from "./components/loginForm";
import { demoAccounts } from "./constants/credentials";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const isValidDemo = demoAccounts.some(
        (acc) => acc.email === email && acc.password === password
      );

      if (isValidDemo) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Only demo accounts can log in.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, router]);

  const handleSelectAccount = useCallback((e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <Header />
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          </CardContent>
        </Card>
        <DemoAccounts onSelect={handleSelectAccount} />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
