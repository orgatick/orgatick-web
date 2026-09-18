import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { cn } from "@orgatick/ui/lib/utils";
import metadataConfig from "@/config/metadata";
import type { Metadata } from "next";
import serverApi from "@/lib/apis/server-auth-api";
import { RestrictedAccess } from "@/components/landing-page/restricted-access";
import type { UserResponse } from "@orgatick/contracts";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = metadataConfig;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let user: null | UserResponse = null;
  const api = await serverApi();
  try {
    const response = await api.get("/users/me");
    user = response.data.data;
  } catch {
    user = null;
  }

  return (
    <html lang="en" className={cn("h-dvh", "antialiased", "font-sans", sourceSans3.variable)}>
      <body className="min-h-full flex flex-col px-2">{!user ? <RestrictedAccess /> : children}</body>
    </html>
  );
}
