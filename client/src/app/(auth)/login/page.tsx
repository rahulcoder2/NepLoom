import LoginForm from "@/components/auth/login-form";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[400px] mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="h1 font-inter">Welcome back</h1>
          <p className="body-2 text-muted-foreground">
            Login to your Neploom account.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default SignInPage;
