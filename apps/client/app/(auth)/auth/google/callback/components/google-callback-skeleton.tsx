import Header from "@/app/(auth)/_components/Header";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function GoogleCallbackSkeleton() {
  return (
    <div className="h-full flex flex-col items-center pt-6">
      <Header />
      <div className="flex-1 h-full flex flex-col w-full items-center justify-center gap-4 px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card/80 p-8 space-y-5 shadow-sm text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <IconBrandGoogle size={30} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Signing you in</h2>
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
