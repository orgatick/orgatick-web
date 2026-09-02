import { Pattern } from "@/components/examples/c-breadcrumb-2";
import { Button } from "@orgatick/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconSparkles, IconRocket, IconCheck } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 gap-8">
      <header className="text-center space-y-2 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2">
          <IconSparkles className="size-4 text-amber-500" />
          <span>Shadcn UI Monorepo Initialized</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Orgatick</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Configured with Tailwind CSS v4, Base Nova styling, and Tabler Icons under the{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">@orgatick/ui</code> workspace
          package.
        </p>
      </header>

      <Pattern />
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconRocket className="size-5 text-primary" />
            Monorepo UI System
          </CardTitle>
          <CardDescription>
            Components and utilities are shared across workspace applications seamlessly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <IconCheck className="size-4 text-emerald-500" />
            <span>@orgatick/ui package structure configured</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconCheck className="size-4 text-emerald-500" />
            <span>Tailwind CSS v4 & PostCSS integrated</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <IconCheck className="size-4 text-emerald-500" />
            <span>Tabler Icons library enabled</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Docs</Button>
          <Button variant="default">Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
