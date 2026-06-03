import { Hero } from "@/components/sections/Hero";
import { TheShift } from "@/components/sections/TheShift";
import { MeetBell } from "@/components/sections/MeetBell";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { OnlyBellKnows } from "@/components/sections/OnlyBellKnows";
import { ForGuests } from "@/components/sections/ForGuests";
import { HumanPlusAI } from "@/components/sections/HumanPlusAI";
import { ForEstablishments } from "@/components/sections/ForEstablishments";
import { UseCases } from "@/components/sections/UseCases";
import { SocialProof } from "@/components/sections/SocialProof";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TheShift />
      <MeetBell />
      <HowItWorks />
      <LiveDemo />
      <OnlyBellKnows />
      <ForGuests />
      <HumanPlusAI />
      <ForEstablishments />
      <UseCases />
      <SocialProof />
      <FAQ />
      <FinalCTA />
    </>
  );
}
