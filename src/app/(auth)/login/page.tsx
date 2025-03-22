import LoginForm from '@/components/shared/auth/login-form'
import React from 'react'

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[400px] mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="h1 font-inter">
            Login in to Neploom
          </h1>
          <p className="body-2 text-muted-foreground">
            Enter your details below to login to your account.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default SignInPage