import constants, { API_BASE_URLS } from "@/config/constants";
import React, { createContext, useContext, useEffect } from "react";
import croupier from "../services/croupier";
import useStore from "../store";

interface ApiContextType {
  API: typeof constants.API;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const environment = useStore((state) => state.environment);

  // Update croupier baseURL when environment.sandbox changes
  useEffect(() => {
    croupier.defaults.baseURL = environment.sandbox
      ? API_BASE_URLS.sandbox
      : API_BASE_URLS.prod;
  }, [environment.sandbox]);

  const value = {
    API: {
      ...constants.API,
      baseURL: environment.sandbox ? API_BASE_URLS.sandbox : API_BASE_URLS.prod,
    },
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
