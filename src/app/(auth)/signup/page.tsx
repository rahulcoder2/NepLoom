import SignupForm from "@/components/shared/auth/signup-form";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[400px] mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="h1 font-inter">Create an account</h1>
          <p className="body-2 text-muted-foreground">
            Enter your details below to create your account and get started.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
