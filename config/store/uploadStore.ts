import { StateCreator } from "zustand";

interface UploadImage {
  uri: string;
  fileName?: string;
  type?: string;
}

interface Upload {
  barcode: string;
  scanId: number;
  images: UploadImage[];
}

export interface UploadSlice {
  upload: Upload;
  setUpload: (userData: Partial<Upload>) => void;
}

export const createUploadSlice: StateCreator<UploadSlice> = (
  set: any,
  get: any
) => ({
  upload: {
    scanId: 0,
    barcode: "",
    images: [],
  },
  setUpload: (uploadData) =>
    set((state: any) => ({
      upload: { ...state.upload, ...uploadData },
      images: uploadData.images ?? state.upload.images,
    })),
});
