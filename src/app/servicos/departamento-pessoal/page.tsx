import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/services/service-page";
import { departamentoPessoalService } from "@/data/services/departamento-pessoal";

export const metadata: Metadata = {
  title: "Departamento Pessoal",
  description: departamentoPessoalService.metaDescription,
};

export default function DepartamentoPessoalPage() {
  return <ServicePage content={departamentoPessoalService} />;
}
