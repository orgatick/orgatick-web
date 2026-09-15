import serverApi from "@/lib/apis/server-auth-api";
import type { UserResponse } from "@orgatick/contracts";

export default async function Home() {
  let _user: null | UserResponse = null;
  const api = await serverApi();
  try {
    const response = await api.get("/users/me");
    _user = response.data.data;
  } catch {
    _user = null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      hello
    </div>
  );
}
