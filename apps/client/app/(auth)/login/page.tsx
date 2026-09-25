import { Suspense } from "react";
import Header from "../_components/Header";
import Link from "next/link";
import LoginForm from "./components/login-form";
import LoginSkeleton from "./components/login-skeleton";
import GoogleLoginButton from "../_components/google-login-button";

function page() {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <p className="text-4xl font-semibold text-center">Good to see you again!</p>
        <div className="w-full gap-4 flex flex-col items-center justify-center">
          <div>
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </div>
          <Suspense fallback={<LoginSkeleton />}>
            <LoginForm />
          </Suspense>
          <div>
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Suspense fallback={<div className="h-14 w-full rounded-full bg-muted animate-pulse" />}>
            <GoogleLoginButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default page;
