"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyCredentials, signInWithDummyCredentials } from "@/services/auth";
import { useAuthStore } from "@/store/auth-store";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@vms.local", password: "Admin@1234", remember: true },
  });

  async function onSubmit(values: LoginValues) {
    setLoading(true);
    const credential = await signInWithDummyCredentials(values.email, values.password);
    setLoading(false);
    if (!credential) {
      toast.error("Invalid dummy credentials");
      return;
    }
    setUser({ name: credential.name, email: credential.email, role: credential.role });
    toast.success(`Signed in as ${credential.role}`);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use one of the dummy accounts below. No backend is connected.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <Input {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} className="pr-10" {...register("password")} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-cyan-500" {...register("remember")} />Remember me</label>
          <Link className="text-cyan-600 dark:text-cyan-300" href="/forgot-password">Forgot password?</Link>
        </div>
        <Button className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-2 font-medium">Dummy users</p>
        <div className="space-y-2">
          {dummyCredentials.map((credential) => (
            <div key={credential.email} className="grid gap-1 rounded-md bg-white p-2 text-xs dark:bg-slate-950">
              <span>{credential.role}: {credential.email}</span>
              <span className="text-slate-500">Password: {credential.password}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-slate-500">
        Need an account? <Link className="text-cyan-600 dark:text-cyan-300" href="/signup">Create one</Link>
      </p>
    </div>
  );
}
