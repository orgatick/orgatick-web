"use client";

import { Badge } from "@orgatick/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@orgatick/ui/components/card";
import { IconChevronDown, IconHelpCircle } from "@tabler/icons-react";
import * as motion from "motion/react-client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const contactFaqs: FAQItem[] = [
  {
    category: "Support Response",
    question: "How fast will I get a response from your team?",
    answer:
      "For standard inquiries via our contact form or email, our team replies within 1 to 2 business hours during our operating window (Mon–Fri, 9:00 AM – 6:00 PM IST). For urgent live event emergencies, active organizers receive priority WhatsApp assistance.",
  },
  {
    category: "Event Hosting",
    question: "Can I book a personalized 1-on-1 walkthrough or demo?",
    answer:
      "Yes! Simply choose 'Host an event' or 'Partnership' in the contact form, and mention your preferred time. Our team will share a Google Meet invite with a personalized walkthrough of the organizer dashboard, offline QR gate scanner, and ticketing system.",
  },
  {
    category: "College Fests & Clubs",
    question: "Do you support free events and student-run clubs?",
    answer:
      "Absolutely. Orgatick is 100% free for zero-ticket-cost campus workshops, webinars, and club meetups with no hidden platform subscription fees.",
  },
  {
    category: "Emergency & Gate Ops",
    question: "What if we experience internet connectivity drops at the venue?",
    answer:
      "Our mobile QR scanner application features full offline verification mode. Gate staff can scan and validate encrypted attendee passes without live internet, and records sync to central servers once connectivity is restored.",
  },
  {
    category: "Custom Integrations",
    question: "Can Orgatick integrate with custom university portals or ERPs?",
    answer:
      "Yes. Our enterprise tier provides custom webhooks, REST API access, student ID validation, and custom payment settlement pipelines tailored for large universities and institutional festivals.",
  },
];

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative border-t border-border/40 bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center"
        >
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary backdrop-blur-md shadow-xs"
          >
            <IconHelpCircle className="mr-1.5 size-3.5 text-primary" />
            Quick Answers
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Find immediate answers to common questions about hosting events, ticket distribution, and working with
            Orgatick.
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {contactFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card
                  className={`cursor-pointer border-border/60 transition-all duration-200 hover:border-primary/40 ${
                    isOpen
                      ? "border-primary/40 bg-card shadow-md shadow-primary/5 ring-1 ring-primary/20"
                      : "bg-card/70 hover:bg-card"
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <CardHeader className="flex flex-row items-center justify-between p-5 sm:p-6">
                    <div className="flex items-center gap-3 pr-4">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                        0{index + 1}
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                          {faq.category}
                        </span>
                        <CardTitle className="text-base font-semibold text-foreground sm:text-lg">
                          {faq.question}
                        </CardTitle>
                      </div>
                    </div>
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-primary/10 text-primary border-primary/30" : "text-muted-foreground"
                      }`}
                    >
                      <IconChevronDown className="size-4" />
                    </div>
                  </CardHeader>
                  {isOpen && (
                    <CardContent className="px-5 pb-5 pt-0 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
                      <div className="border-t border-border/40 pt-4">{faq.answer}</div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
