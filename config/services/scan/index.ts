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
  product: {
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
  product_variants: {
    id?: number;
    product_id?: number;
    barcode?: string;
    image?: {
      url?: string;
    };
  }[];
}

interface IMyScanRecords extends ApiResponse {
  records: IMyScan[];
}

export interface IMyScan {
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
  created_at: string;
  updated_at: string;
  product_category_source_id?: number;
  product_id?: number;
  user_id?: number;
  scan_date?: string;
  barcode?: string;
  product_exists?: boolean;
  image?: string;
}

interface ITopScanRecords extends ApiResponse {
  records: ITopScan[];
}

export interface ITopScan {
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
  created_at: string;
  updated_at: string;
  product_category_source_id?: number;
  product_id?: number;
  user_id?: number;
  scan_date?: string;
  barcode?: string;
  product_exists?: boolean;
  image?: string;
  ranked_barcode: string;
}

const scanProduct = (payload: Payload): Promise<IScan> =>
  request.post({ payload: payload, route: routes.scan.scan });

const myScans = (): Promise<IMyScanRecords> =>
  request.get({ route: routes.scan.myScans });

const topScans = (): Promise<ITopScanRecords> =>
  request.get({ route: routes.scan.topScans });

const scan = {
  scanProduct,
  myScans,
  topScans,
};

export default scan;
