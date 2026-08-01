import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/services/service-page";
import { complementaresService } from "@/data/services/complementares";

export const metadata: Metadata = {
  title: "Serviços Complementares",
  description: complementaresService.metaDescription,
};

export default function ComplementaresPage() {
  return <ServicePage content={complementaresService} />;
}
