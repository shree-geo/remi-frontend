"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DemoAccounts from "./components/demoAccounts";
import Footer from "./components/footer";
import Header from "./components/header";
import LoginForm from "./components/loginForm";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (eEmail: string, pPassword: string) => {
    setIsLoading(true);
    setError("");
    try {
      // Mock login logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (eEmail && pPassword) {
        router.push("/dashboard");
      } else {
        setError("Please enter both email and password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAccount = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <Header />
        {/* Login Card */}
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
