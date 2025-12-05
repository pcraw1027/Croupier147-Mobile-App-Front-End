import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

interface Environment {
  sandbox: boolean;
}

export interface EnvironmentSlice {
  environment: Environment;
  setEnvironment: (environmentData: Partial<Environment>) => void;
  toggleSandbox: () => void;
}

export const createEnvironmentSlice = persist<EnvironmentSlice>(
  (set) => ({
    environment: {
      sandbox: false, // default value
    },
    setEnvironment: (environmentData) =>
      set((state) => ({
        environment: { ...state.environment, ...environmentData },
      })),
    toggleSandbox: () =>
      set((state) => ({
        environment: { sandbox: !state.environment.sandbox },
      })),
  }),
  {
    name: "environment-storage", // key in AsyncStorage
    storage: {
      getItem: async (name) => {
        const value = await AsyncStorage.getItem(name);
        return value ? JSON.parse(value) : null;
      },
      setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: async (name) => {
        await AsyncStorage.removeItem(name);
      },
    },
  }
);
