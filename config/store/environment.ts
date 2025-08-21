import { StateCreator } from "zustand";

interface Environment {
  sandbox: boolean;
}

export interface EnvironmentSlice {
  environment: Environment;
  setEnvironment: (environmentData: Partial<Environment>) => void;
}

export const createEnvironmentSlice: StateCreator<EnvironmentSlice> = (
  set: any,
  get: any
) => ({
  environment: {
    sandbox: false,
  },
  setEnvironment: (environmentData) =>
    set((state: any) => ({
      environment: { ...state.environment, ...environmentData },
    })),
});
