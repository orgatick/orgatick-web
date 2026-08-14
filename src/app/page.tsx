import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CapabilitiesGrid } from "@/components/sections/home/capabilities-grid";
import { FAQSection } from "@/components/sections/home/faq";
import { HeroSection } from "@/components/sections/home/hero-section";
import { PersonaMatrixSection } from "@/components/sections/home/persona-matrix";
import { PricingSection } from "@/components/sections/home/pricing";
import { ProblemSolutionSection } from "@/components/sections/home/problem-solution";
import { TechArchitectureSection } from "@/components/sections/home/tech-architecture";
import { ThreePillarsSection } from "@/components/sections/home/three-pillars";
import { TrustSection } from "@/components/sections/home/trust-section";
import { UserJourneySection } from "@/components/sections/home/user-journey";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSolutionSection />
        <ThreePillarsSection />
        <CapabilitiesGrid />
        <UserJourneySection />
        <PersonaMatrixSection />
        <TechArchitectureSection />
        <PricingSection />
        <TrustSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
