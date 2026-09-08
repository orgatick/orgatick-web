import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <ToastProvider>{children}</ToastProvider>;
// }
