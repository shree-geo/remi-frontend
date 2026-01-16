"use client";
import { createTestStore, type TestStore } from "@/store/test/store";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

type TestStoreApi = ReturnType<typeof createTestStore>;

const TestContext = createContext<TestStoreApi | undefined>(undefined);

export function useTestStore(): TestStore {
  const ctx = useContext(TestContext);
  if (!ctx)
    throw new Error("useTestStore must be used within a TestStoreProvider");
  return useStore(ctx);
}

export default function TestStoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<TestStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTestStore();
  }
  return (
    // eslint-disable-next-line react-hooks/refs
    <TestContext.Provider value={storeRef.current}>
      {children}
    </TestContext.Provider>
  );
}
