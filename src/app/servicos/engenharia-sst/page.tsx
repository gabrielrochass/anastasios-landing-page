import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/services/service-page";
import { engenhariaSstService } from "@/data/services/engenharia-sst";

export const metadata: Metadata = {
  title: "Engenharia de SST",
  description: engenhariaSstService.metaDescription,
};

export default function EngenhariaSstPage() {
  return <ServicePage content={engenhariaSstService} />;
}
