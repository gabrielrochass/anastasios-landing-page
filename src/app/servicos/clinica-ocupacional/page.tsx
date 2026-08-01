import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/services/service-page";
import { clinicaOcupacionalService } from "@/data/services/clinica-ocupacional";

export const metadata: Metadata = {
  title: "Clínica Ocupacional",
  description: clinicaOcupacionalService.metaDescription,
};

export default function ClinicaOcupacionalPage() {
  return <ServicePage content={clinicaOcupacionalService} />;
}
