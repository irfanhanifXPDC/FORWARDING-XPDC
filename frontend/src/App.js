import React, { useState, useCallback } from "react";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";
import Preloader from "@/components/Preloader";
import Scene3D from "@/components/Scene3D";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import Tracking from "@/components/Tracking";
import ContactFooter from "@/components/ContactFooter";
import InquiryModal from "@/components/InquiryModal";

function Landing() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [service, setService] = useState("Air Freight");
  const [, setReady] = useState(false);

  const openInquiry = useCallback((svc) => {
    setService(svc || "Air Freight");
    setInquiryOpen(true);
  }, []);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <SmoothScroll>
        <Scene3D />
        <Header onOpenInquiry={openInquiry} />
        <main className="relative z-10">
          <Hero onOpenInquiry={openInquiry} />
          <About />
          <Services onOpenInquiry={openInquiry} />
          <WhyChooseUs />
          <ProcessSteps />
          <Testimonials />
          <Tracking />
          <ContactFooter onOpenInquiry={openInquiry} />
        </main>
      </SmoothScroll>
      <InquiryModal
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        service={service}
      />
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "bg-card/90 backdrop-blur-xl border border-border/60 text-foreground rounded-2xl font-sans shadow-[0_20px_50px_-10px_hsl(0_0%_0%/0.4)]",
            title: "font-display text-base",
            description: "text-muted-foreground text-sm",
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <div className="App min-h-screen bg-background">
      <AppProvider>
        <Landing />
      </AppProvider>
    </div>
  );
}
