import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectDefinition } from "@/components/ProjectDefinition";
import { ProjectFacts } from "@/components/ProjectFacts";
import { RegistrationBenefits } from "@/components/RegistrationBenefits";
import { HomeTypes } from "@/components/HomeTypes";
import { PricingStatus } from "@/components/PricingStatus";
import { LocationSection } from "@/components/LocationSection";
import { DeveloperSection } from "@/components/DeveloperSection";
import { BuyerChecklist } from "@/components/BuyerChecklist";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LaunchBanner } from "@/components/LaunchBanner";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SectionTracker } from "@/components/SectionTracker";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <LaunchBanner />
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        <Hero />
        <ProjectDefinition />
        <ProjectFacts />
        <RegistrationBenefits />
        <HomeTypes />
        <PricingStatus />
        <LocationSection />
        <DeveloperSection />
        <BuyerChecklist />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCta />
      <SectionTracker />
    </>
  );
}
