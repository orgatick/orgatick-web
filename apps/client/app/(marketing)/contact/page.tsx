import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import * as motion from "motion/react-client";
import { ContactDetails } from "./_components/contact-details";
import { ContactFaq } from "./_components/contact-faq";
import { ContactForm } from "./_components/contact-form";

export default function ContactPage() {
  return (
    <>
      {/* Contact Form & Direct Channels Section */}
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:px-8">
        <ContactDetails />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="border-border/70 bg-card/95 shadow-xl shadow-primary/5 backdrop-blur-xs ring-1 ring-border/50 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
            <CardHeader className="gap-2">
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Send us a message
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Fill in your details below and our team will get back to you with custom guidance for your event.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <ContactFaq />
    </>
  );
}
