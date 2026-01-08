import { createStore } from "zustand/vanilla";

export type TestState = {
  loading: boolean;
  data: unknown;
};

export type TestActions = {
  setLoading: (loading: boolean) => void;
  setData: (data: unknown) => void;
};

export type TestStore = TestState & TestActions;

export const defaultInitState: TestState = {
  loading: true,
  data: null,
};

export const createTestStore = (
  initState: TestState = defaultInitState
) =>
  createStore<TestStore>()((set) => ({
    ...initState,
    setLoading: (loading) => set({ loading }),
    setData: (data) => set({ data }),
  }));