"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { useReducedMotion } from "@/hooks/use-motion-preference";

/**
 * Decide se o shader pode montar e se o rAF pode rodar agora.
 *
 * Um requestAnimationFrame que nunca para é imposto de INP e de bateria pago
 * por todo mundo, inclusive por quem já rolou muito além da seção. Aqui ele só
 * roda quando as quatro condições valem ao mesmo tempo: elemento visível na
 * viewport, aba em primeiro plano, movimento permitido e hardware disposto.
 */

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function connection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
}

/**
 * Conexão cara ou lenta não recebe shader. O fundo sólido já é o mesmo
 * fallback de quem não tem WebGL2, então não existe caminho extra a manter.
 */
function networkAllowsShader(): boolean {
  const net = connection();
  if (!net) return true;
  if (net.saveData) return false;
  if (net.effectiveType === "2g" || net.effectiveType === "slow-2g") {
    return false;
  }
  return true;
}

function supportsWebGl2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export interface GlGate {
  /** Se o <canvas> deve existir no DOM */
  enabled: boolean;
  /** Se o rAF deve estar rodando neste instante */
  active: boolean;
  /** Movimento reduzido: renderiza exatamente um frame e para */
  freeze: boolean;
}

/**
 * Capacidade do aparelho não muda durante a sessão, então é lida uma vez e
 * memoizada no módulo. `getSnapshot` do useSyncExternalStore precisa devolver
 * valor estável, senão o React entra em loop de render.
 *
 * Por que não um useEffect com setState: criar um WebGL2 de teste e chamar
 * setState no corpo do efeito dispara render em cascata, e a regra
 * react-hooks/set-state-in-effect (nova no React 19) reprova com razão.
 */
let capabilityCache: boolean | null = null;

function subscribeNever(): () => void {
  return () => {};
}

function readCapability(): boolean {
  if (capabilityCache === null) {
    capabilityCache = supportsWebGl2() && networkAllowsShader();
  }
  return capabilityCache;
}

function noCapabilityOnServer(): boolean {
  return false;
}

export function useGlGate(ref: RefObject<HTMLElement | null>): GlGate {
  const reduced = useReducedMotion();
  const enabled = useSyncExternalStore(
    subscribeNever,
    readCapability,
    noCapabilityOnServer,
  );
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // Uma margem pequena para o shader já estar rodando quando a seção
      // entra, sem começar a rodar um viewport inteiro antes.
      { rootMargin: "10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const onVisibility = () =>
      setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  return {
    enabled,
    // Sob movimento reduzido o gate ainda deixa "ativo" uma vez, para o
    // componente desenhar o frame estático. Quem para o loop é o `freeze`.
    active: enabled && inView && visible && !reduced,
    freeze: reduced,
  };
}
