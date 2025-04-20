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
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logIn, updateLoginCheckDone } from "@/redux/features/auth/auth-slice";
import { USER_ROLES } from "@/types/auth-types";
import { useAppDispatch } from "@/redux/store";

const LoginForm = () => {
  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] =
    useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<loginFormData>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (signinData: loginFormData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        signinData,
        {withCredentials: true}
      );
      if (res.status === 200) {
        toast.success(res.data.message || "Login successful!");
        // Dispatch login action
        dispatch(logIn(res.data.user));
        
        // Update login check done
        dispatch(updateLoginCheckDone(true));

        // Check user role and redirect accordingly
        const { role } = res.data?.user;
        if (role === USER_ROLES.admin) {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
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
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" size="lg" className="w-full">
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
            priority
          />
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
