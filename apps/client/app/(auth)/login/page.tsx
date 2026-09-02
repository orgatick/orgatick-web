import Header from "../components/Header";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
// import { IconPasswordFingerprint } from "@tabler/icons-react";
import { Button } from "@orgatick/ui/components/button";
import LoginForm from "./components/login-form";

function page() {
  // const { email, emailDraft, loading, handleEmailSubmit, handleGoogleLogin } =
  //   authStore();

  // // const { fetchUser } = useUserStore();
  // const router = useRouter();
  // const [passkeyError, setPasskeyError] = useState(null);

  // const handlePasskeyClick = async () => {
  //   setPasskeyError(null);
  //   const candidateEmail = (email || emailDraft || "").trim();

  //   if (!candidateEmail) {
  //     setPasskeyError("Please enter your email first.");
  //     return;
  //   }

  //   try {
  //     const res = await handleEmailSubmit(candidateEmail);
  //     const externalAuth = localStorage.getItem("redirect");
  //     if (res && externalAuth) {
  //       localStorage.removeItem("redirect");
  //       router.replace(externalAuth);
  //     } else if (res) {
  //       fetchUser();
  //       router.replace("/events");
  //     } else {
  //       toast.error("Passkey authentication failed. Please try again.");
  //       setPasskeyError("Passkey authentication failed. Please try again.");
  //     }
  //   } catch (err) {
  //     setPasskeyError(err.message || "Unable to continue with passkey");
  //   }
  // };

  // const googleLogin = async () => {
  //   const redirectUrl = await handleGoogleLogin();
  //   router.push(redirectUrl);
  // };

  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <p className="text-4xl font-semibold text-center">Good to see you again!</p>
        <div className="w-full gap-4 flex flex-col items-center justify-center">
          <div>
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <LoginForm />
          <div>
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div>
            <Button
              className="w-full rounded-full text-xl h-14"
              variant={"outline"}
              // onClick={googleLogin}
            >
              <IconBrandGoogle size={18} className="mr-2" />
              Continue with Google
            </Button>
          </div>
          {/*{!email && (
            <div>
              <Button
                className="w-full rounded-full text-xl h-14"
                variant={"outline"}
                disabled={loading}
                onClick={handlePasskeyClick}
              >
                <IconPasswordFingerprint size={18} className="mr-2" />
                Continue with Passkey
              </Button>
            </div>
          )}*/}
        </div>
      </div>
    </div>
  );
}

export default page;
