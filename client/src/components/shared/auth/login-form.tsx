"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ForgetPasswordModel from "./forget-password-model";
import { loginFormData, loginSchema } from "@/schemas/login-schema";

const LoginForm = () => {
  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<loginFormData>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data : loginFormData) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <div
              onClick={() => setIsForgetPasswordModelOpen(true)}
              className="ml-auto cursor-pointer text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </div>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
      <ForgetPasswordModel
        open={isForgetPasswordModelOpen}
        onOpenChange={setIsForgetPasswordModelOpen}
      />
    </>
  );
};

export default LoginForm;
