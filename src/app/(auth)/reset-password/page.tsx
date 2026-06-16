import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <form className="mt-6 space-y-4">
        <Input placeholder="New password" type="password" />
        <Input placeholder="Confirm password" type="password" />
        <Button className="w-full" type="button">Update password</Button>
      </form>
    </div>
  );
}
