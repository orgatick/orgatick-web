import Link from "next/link";
import Header from "../components/Header";
import ForgotPasswordForm from "./components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <p className="text-4xl font-semibold text-center">Reset your password</p>
        <div className="w-full gap-4 flex flex-col items-center justify-center">
          <div>
            Remembered your password?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
