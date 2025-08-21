import constants from "@/config/constants";
import request from "../request";

const {
  API: { routes },
} = constants;

interface ApiResponse {
  [x: string]: any;
  success: boolean;
  code: number;
  message: string;
}

type Payload = Record<string, unknown>;

interface IScan extends ApiResponse {
  product?: {
    id: number;
    company_id?: number;
    name?: string;
    description?: string;
    qrcode?: string;
    size?: string;
    segment_id?: number;
    family_id?: number;
    klass_id?: number;
    brick_id?: number;
    product_category_source_id?: number;
  };
  product_variants?: {
    id?: number;
    product_id?: number;
    barcode?: string;
    image?: {
      url?: string;
    };
  }[];
  scan?: {
    id: number;
    product_id?: number;
    barcode?: string;
    product_exists?: boolean;
  };
}

interface IMyScanRecords extends ApiResponse {
  records: IMyScan[];
}

export interface IMyScan {
  scan?: {
    id?: number;
    product_id?: number;
    user_id?: number;
    scan_date?: string;
    barcode?: string;
    product_exists?: boolean;
    created_at?: string;
  };
  product_data?: {
    scan_count?: number;
    product_variant?: {
      id?: number;
      product_id?: number;
      barcode?: string;
      created_at?: string;
      product_name?: string;
      product_description?: string;
      searches?: number;
      product_comany_id?: number;
      company_name?: string;
      avrg_rating?: number;
    };
    media?: {
      file: {
        url: string;
      };
    }[];
  };
}

interface ITopScanRecords extends ApiResponse {
  records: ITopScan[];
}

export interface ITopScan {
  scan_count?: number;
  product_variant: {
    id?: number;
    product_id?: number;
    barcode?: string;
    created_at?: string;
    product_name?: string;
    product_description?: string;
    product_comany_id?: number;
    company_name?: string;
    avrg_rating?: number;
  };
  media: {
    file: {
      url: string;
    };
  }[];
}

export interface IMyUploadsRecords extends ApiResponse {
  records: IUploads[];
}

export interface IUploads {
  upload: {
    id?: number;
    scan_id?: number;
    user_id?: number;
    resolve_status?: boolean;
    date?: string;
    barcode?: string;
    company_name?: string;
    product_name?: string;
    remarks?: string;
    created_at?: string;
  };
  scan?: {
    product_id?: number;
    barcode?: string;
  };
  media?: {
    id?: number;
    file?: {
      url?: string;
    };
  }[];
}

const scanProduct = (payload: Payload): Promise<IScan> =>
  request.post({ payload: payload, route: routes.scan.scan });

const uploadProduct = (payload: any): Promise<ApiResponse> =>
  request.postFormDataPost({
    payload: payload,
    route: routes.scan.uploadProduct,
  });

const myScans = (): Promise<IMyScanRecords> =>
  request.get({ route: routes.scan.myScans });

const topScans = (): Promise<ITopScanRecords> =>
  request.get({ route: routes.scan.topScans });

const myUploads = (): Promise<IMyUploadsRecords> =>
  request.get({ route: routes.scan.myUploads });

const scan = {
  scanProduct,
  uploadProduct,
  myScans,
  topScans,
  myUploads,
};

export default scan;
