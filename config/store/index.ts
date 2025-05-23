import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authStore";
import { UploadSlice, createUploadSlice } from "./uploadStore";

const useStore = create<AuthSlice & UploadSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUploadSlice(...a),
}));

export default useStore;
