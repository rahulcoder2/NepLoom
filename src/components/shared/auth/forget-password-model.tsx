"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailData, emailSchema } from "@/schemas/email-schema";
import { passwordData, passwordSchema } from "@/schemas/password-schema";

interface ForgetPasswordModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "email" | "password";

const ForgetPasswordModel = ({
  open,
  onOpenChange,
}: ForgetPasswordModelProps) => {
  const [step, setStep] = useState<Step>("email");

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  });

  const onSubmitEmail = (data: emailData) => {
    console.log("Email submitted:", data);
    setStep("password");
  };

  const onSubmitPassword = (data: passwordData) => {
    console.log("New password submitted:", data);
    onOpenChange(false);
    setStep("email");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {step === "email"
              ? "Enter your email to reset your password."
              : "Enter your new password."}
          </DialogDescription>
        </DialogHeader>
        {step === "email" ? (
          <form onSubmit={emailForm.handleSubmit(onSubmitEmail)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Next</Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...passwordForm.register("password")}
                />
                {passwordForm.formState.errors.password && (
                  <p className="text-red-500 text-sm">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Reset Password</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordModel;
