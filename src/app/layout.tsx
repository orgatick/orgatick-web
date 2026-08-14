import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import metadataConfig from "@/config/metadata";
import { cn } from "@/lib/utils";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = metadataConfig;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", sourceSans3.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
