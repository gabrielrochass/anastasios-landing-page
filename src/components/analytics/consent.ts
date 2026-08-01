import { useSyncExternalStore } from "react";

export const CONSENT_STORAGE_KEY = "esol-consent";
export const CONSENT_CHANGED_EVENT = "esol-consent-changed";

/** Sentinela do snapshot de servidor — antes da hidratação nada é decidido. */
const SERVER_SNAPSHOT = "pending" as const;

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

/**
 * Valor atual do consentimento: "granted" | "denied" | null (sem decisão)
 * | "pending" (render de servidor).
 */
export function useConsent(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}

export function setConsent(value: "granted" | "denied") {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}
