import type { IconProps } from "@/components/icons";
import type { StockPhotoKey } from "@/lib/photos";

export type ServiceHeroAnchor =
  | "timeline"
  | "exam-status"
  | "dp-flow"
  | "pericia-stack";

export interface ServiceSolutionCard {
  icon: React.ComponentType<IconProps>;
  title: string;
  summary: string;
  detail: string;
}

export interface ServiceDifferential {
  icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
}

export interface ServiceContent {
  slug: string;
  /** Eyebrow com o número da norma quando aplicável. */
  eyebrow: string;
  title: string;
  lead: string;
  metaDescription: string;
  /** Foto real que lidera o hero (overlay petróleo garante contraste). */
  heroImage: StockPhotoKey;
  /** Assinatura funcional da página, agora renderizada numa seção do meio. */
  heroAnchor: ServiceHeroAnchor;
  /** Foto do case (interino; slots humanos reais usam foto própria). */
  caseImage?: StockPhotoKey;
  /** Banda de parallax opcional no meio da página (só onde faz sentido). */
  midImage?: StockPhotoKey;
  problem: {
    title: string;
    /** Um ou mais parágrafos — arrays evitam blocos densos na dobra. */
    body: string | string[];
  };
  solutions: ServiceSolutionCard[];
  /** ids de eventos em src/data/legislation-timeline.ts exibidos na página. */
  timelineIds: string[];
  differentials: ServiceDifferential[];
  cta: {
    title: string;
    body: string;
  };
}
