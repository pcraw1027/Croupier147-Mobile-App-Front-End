import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authStore";
import { createEnvironmentSlice, EnvironmentSlice } from "./environment";
import { createUploadSlice, UploadSlice } from "./uploadStore";

const useStore = create<AuthSlice & UploadSlice & EnvironmentSlice>()(
  (...a) => ({
    ...createAuthSlice(...a),
    ...createUploadSlice(...a),
    ...createEnvironmentSlice(...a),
  })
);

export default useStore;
