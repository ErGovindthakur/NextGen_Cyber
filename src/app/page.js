// app/page.jsx
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FooterSection from "@/components/FooterSection";
import ProcessSection from "@/components/ProcessSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <FooterSection />
    </>
  );
}