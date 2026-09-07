import { ContactDetails } from "./_components/contact-details";
import { ContactForm } from "@/app/contact/_components/contact-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* <ContactHero /> */}

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <ContactDetails />

          <Card className="border-border/70 bg-card shadow-xl shadow-primary/5 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
            <CardHeader className="gap-2">
              <CardTitle className="text-2xl tracking-tight">Send us a message</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Share a few details and we&apos;ll connect you with the right person.
              </CardDescription>
            </CardHeader>
            {/* <Separator /> */}
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
