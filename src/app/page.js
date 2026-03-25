  "use client";

  import { useEffect } from "react";
  import { useUser } from "@clerk/nextjs";

  import HeroSection from "@/components/HeroSection";
  import ServicesSection from "@/components/ServicesSection";
  import FooterSection from "@/components/FooterSection";
  import ProcessSection from "@/components/ProcessSection";

  export default function Home() {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
      if (isLoaded && isSignedIn && user) {
        fetch("/api/sync-user", {
          method: "POST",
          credentials: "include", // ✅ VERY IMPORTANT
        });
      }
    }, [isLoaded, isSignedIn, user]);

    return (
      <>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <FooterSection />
      </>
    );
  }
