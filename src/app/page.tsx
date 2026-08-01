import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { ProblemCards } from "@/components/sections/home/problem-cards";
import { WorkerScene } from "@/components/motion/worker-scene";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema } from "@/lib/seo/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemCards />
      <WorkerScene />
      <FinalCta />
      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
