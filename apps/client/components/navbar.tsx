import type { UserResponse } from "@orgatick/contracts";
import { NavbarBrand } from "./navbar/navbar-brand";
import { NavbarLinks } from "./navbar/navbar-links";
import { NavbarMobile } from "./navbar/navbar-mobile";
import { NavbarUser } from "./navbar/navbar-user";
import { ThemeToggle } from "./navbar/theme-toggle";
import serverApi from "@/lib/apis/server-auth-api";

export async function Navbar() {
  let user: UserResponse | null = null;
  try {
    const api = await serverApi();
    const response = await api.get("/users/me");
    user = response.data.data as UserResponse;
  } catch {
    user = null;
  }

  return (
    <header className="navbar-scroll sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <NavbarBrand />

        <NavbarLinks />

        <div className="ms-auto flex items-center gap-1.5 sm:gap-2.5">
          <ThemeToggle />
          <NavbarUser user={user} />
          <NavbarMobile user={user} />
        </div>
      </div>
    </header>
  );
}
