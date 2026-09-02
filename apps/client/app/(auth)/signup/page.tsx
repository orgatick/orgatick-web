import Header from "../components/Header";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import SignupForm from "./components/signup-form";

function page() {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <p className="text-4xl font-semibold text-center">Let&apos;s get you started!</p>
        <div className="w-full gap-4 flex flex-col items-center justify-center">
          <div>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
        <SignupForm />
        <div className="w-full flex flex-col gap-4">
          <div>
            <Button className="w-full rounded-full text-xl h-14" variant={"outline"}>
              <IconBrandGoogle size={18} className="mr-2" />
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
