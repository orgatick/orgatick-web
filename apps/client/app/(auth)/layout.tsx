import { redirect } from "next/navigation";
import Footer from "./_components/Footer";
import DesktopInfo from "./_components/DesktopInfo";
import { serverApi } from "@/lib/apis/server-auth-api";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  let isAuthenticated = false;
  try {
    const api = await serverApi();
    const response = await api.get("/users/me");
    if (response?.data) isAuthenticated = true;
  } catch {
    isAuthenticated = false;
  }
  if (isAuthenticated) redirect("/");

  return (
    <div className="h-full relative flex flex-col items-center justify-center w-full space-y-5 pb-4 sm:pb-0">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute -top-24 left-1/2 h-80 w-80 translate-x-[-90%] rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="flex-1 h-full w-full sm:rounded-2xl sm:border sm:border-border/70 sm:bg-card/95 sm:shadow-xl lg:grid grid-cols-2 lg:max-h-160 lg:overflow-hidden lg:rounded-3xl lg:bg-card/90 lg:backdrop-blur sm:max-w-6xl">
        <DesktopInfo />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
