import { StateCreator } from "zustand";

interface User {
  inviteCode: string;
  email: string;
  username: string;
  password: string;
  country: string;
  postalCode: string;
}

export interface AuthSlice {
  user: User;
  setUser: (userData: Partial<User>) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (
  set: any,
  get: any
) => ({
  user: {
    inviteCode: "",
    email: "",
    username: "",
    password: "",
    country: "",
    postalCode: "",
  },
  setUser: (userData) =>
    set((state: any) => ({
      user: { ...state.user, ...userData },
    })),
});
