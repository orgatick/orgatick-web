import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { cn } from "@orgatick/ui/lib/utils";
import metadataConfig from "@/config/metadata";
import Providers from "@/providers";

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
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", sourceSans3.variable)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
