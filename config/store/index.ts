import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authStore";

const useStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useStore;
