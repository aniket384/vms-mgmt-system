"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const strength = useMemo(() => Math.min(100, password.length * 12 + (/[A-Z]/.test(password) ? 16 : 0) + (/\d/.test(password) ? 16 : 0)), [password]);
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form className="mt-6 space-y-4">
        <Input placeholder="Name" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Progress value={strength} />
        <Input placeholder="Confirm password" type="password" />
        <Button className="w-full" type="button">Create dummy account</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link className="text-cyan-600 dark:text-cyan-300" href="/login">Sign in</Link></p>
    </div>
  );
}
