import { Button } from "@orgatick/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@orgatick/ui/components/card";
import { IconBook, IconCheck, IconRocket } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 gap-8">
      <header className="text-center space-y-2 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2">
          <IconBook className="size-4 text-blue-500" />
          <span>Documentation App</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Orgatick <span className="text-primary">Docs</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Sharing shadcn/ui components from{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">
            @orgatick/ui
          </code>
          .
        </p>
      </header>

      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconRocket className="size-5 text-primary" />
            Shared UI System
          </CardTitle>
          <CardDescription>
            Components imported directly across monorepo apps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <IconCheck className="size-4 text-emerald-500" />
            <span>@orgatick/ui components ready</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="default">View Docs</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
