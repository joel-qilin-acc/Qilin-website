"use client";

import { useEffect, useRef } from "react";

const storageKey = "qilin-attribution";
const trackedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "for"];

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  trackedKeys.forEach((key) => {
    const value = params.get(key);
    if (value) fresh[key] = value;
  });
  const stored = sessionStorage.getItem(storageKey);
  const known = stored ? (JSON.parse(stored) as Record<string, string>) : {};
  return {
    ...known,
    ...fresh,
    referrer: known.referrer ?? document.referrer,
    landing: known.landing ?? window.location.pathname,
  };
}

export function useAttribution() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const merged = readAttribution();
      sessionStorage.setItem(storageKey, JSON.stringify(merged));
      if (inputRef.current) inputRef.current.value = JSON.stringify(merged);
    } catch {
      if (inputRef.current) inputRef.current.value = "";
    }
  }, []);

  return inputRef;
}
