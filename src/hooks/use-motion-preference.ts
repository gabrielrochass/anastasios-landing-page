"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Preferência de movimento, unificando as duas fontes possíveis.
 *
 * O `useReducedMotion()` do motion só enxerga a media query do sistema. O site
 * também tem um botão no rodapé, porque nem todo mundo sabe que a preferência
 * existe no sistema operacional, e porque WCAG 2.2 SC 2.2.2 pede um mecanismo
 * na própria página. Componente nenhum deveria precisar saber que existem duas
 * fontes, então elas se resolvem aqui.
 *
 * Precedência: se qualquer uma das duas pede movimento reduzido, é reduzido.
 * Nunca o contrário. Quem ligou a preferência no sistema não deve precisar
 * ligar de novo no site.
 */

export const MOTION_STORAGE_KEY = "hh-motion";
export const MOTION_CHANGE_EVENT = "hh-motion-change";

const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

function systemPrefersReduced(): boolean {
  return window.matchMedia(MEDIA_QUERY).matches;
}

function siteOverrideIsReduced(): boolean {
  return document.documentElement.getAttribute("data-motion") === "reduced";
}

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(MEDIA_QUERY);
  mql.addEventListener("change", onChange);
  window.addEventListener(MOTION_CHANGE_EVENT, onChange);
  // Mantém abas do mesmo site em sincronia.
  window.addEventListener("storage", onChange);
  return () => {
    mql.removeEventListener("change", onChange);
    window.removeEventListener(MOTION_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): boolean {
  return systemPrefersReduced() || siteOverrideIsReduced();
}

/**
 * No servidor assumimos movimento permitido, que é o padrão da maioria. O
 * script inline no <head> já aplicou o atributo antes do primeiro paint, então
 * quem tem a preferência ligada não chega a ver frame animado.
 */
function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Só o override do site é alternável. A preferência do sistema é do sistema, e
 * o botão nunca a desliga: se ela está ligada, o botão fica travado em
 * reduzido e o rótulo explica o porquê.
 */
export function useMotionToggle() {
  const reduced = useReducedMotion();

  const systemLocked =
    typeof window !== "undefined" && systemPrefersReduced();

  const toggle = useCallback(() => {
    const next = document.documentElement.getAttribute("data-motion") === "reduced"
      ? null
      : "reduced";

    if (next) {
      document.documentElement.setAttribute("data-motion", next);
    } else {
      document.documentElement.removeAttribute("data-motion");
    }

    try {
      if (next) {
        localStorage.setItem(MOTION_STORAGE_KEY, next);
      } else {
        localStorage.removeItem(MOTION_STORAGE_KEY);
      }
    } catch {
      // Modo privado ou storage bloqueado. A preferência ainda vale nesta
      // sessão, só não sobrevive ao reload.
    }

    window.dispatchEvent(new Event(MOTION_CHANGE_EVENT));
  }, []);

  return { reduced, systemLocked, toggle };
}
