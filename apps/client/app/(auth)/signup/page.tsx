import { Suspense } from "react";
import Header from "../_components/Header";
import Link from "next/link";
import SignupForm from "./components/signup-form";
import GoogleLoginButton from "../_components/google-login-button";

function page() {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <p className="text-4xl font-semibold text-center">Let&apos;s get you started!</p>
        <div className="w-full gap-4 flex flex-col items-center justify-center">
          <div>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Log in
            </Link>
          </div>
        </div>
        <SignupForm />
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
