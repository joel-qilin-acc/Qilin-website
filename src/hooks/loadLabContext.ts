"use client";

import { createContext, useContext } from "react";
import type { FixId } from "@/lib/load-lab/model";

export type LoadLabState = {
  fixes: FixId[];
  rps: number;
  toggleFix: (id: FixId) => void;
  applyAll: () => void;
  reset: () => void;
  changeRps: (rps: number) => void;
};

export const LoadLabContext = createContext<LoadLabState | null>(null);

export function useLoadLab() {
  const state = useContext(LoadLabContext);
  if (!state) throw new Error("useLoadLab must be used inside LoadLabProvider");
  return state;
}
