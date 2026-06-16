"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold">Forgot password</h1>
      {sent ? (
        <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
          Dummy reset instructions have been generated for the entered email.
        </div>
      ) : (
        <form className="mt-6 space-y-4">
          <Input placeholder="Email" type="email" />
          <Button className="w-full" type="button" onClick={() => setSent(true)}>Send reset link</Button>
        </form>
      )}
    </div>
  );
}
