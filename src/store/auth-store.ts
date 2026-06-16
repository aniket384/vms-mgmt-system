"use client";

import { create } from "zustand";
import type { DummyCredential } from "@/services/auth";

type AuthState = {
  user: Omit<DummyCredential, "password"> | null;
  setUser: (user: Omit<DummyCredential, "password">) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
