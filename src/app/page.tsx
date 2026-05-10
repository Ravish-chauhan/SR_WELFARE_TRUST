import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import KeyCausesSection from "@/components/KeyCausesSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import DonationSection from "@/components/DonationSection";
import ProgramsSection from "@/components/ProgramsSection";
import ImpactSection from "@/components/ImpactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <KeyCausesSection />
        <EventsSection />
        <GallerySection />
        <DonationSection />
        {/* <ProgramsSection /> */}
        {/* <TestimonialsSection /> */}
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
