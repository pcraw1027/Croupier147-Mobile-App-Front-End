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

interface ILandingMetrics extends ApiResponse {
  my_scans: IHomeMyScan[];
  top_scans: IHomeTopScan[];
  activity_stats: {
    type: string;
    currentMonth: string;
    overall: string;
  }[];
}

interface ILandingOpenMetrics extends ApiResponse {
  top_scans: IHomeTopScan[];
  activity_stats: {
    type: string;
    currentMonth: string;
    overall: string;
  }[];
}

export interface IHomeMyScan {
  id: number;
  company_id: number;
  name: string;
  description: string;
  qrcode: string;
  size: string;
  segment_id: number;
  family_id: number;
  klass_id: number;
  brick_id: number;
  product_category_source_id: number;
  product_id: number;
  user_id: number;
  barcode: string;
  product_exists: boolean;
  image: string;
}

export interface IHomeTopScan {
  id: number;
  company_id: number;
  name: string;
  description: string;
  qrcode: string;
  size: string;
  segment_id: number;
  family_id: number;
  klass_id: number;
  brick_id: number;
  product_category_source_id: number;
  product_id: number;
  user_id: number;
  barcode: string;
  product_exists: boolean;
  image: string;
}

const metrics = (): Promise<ILandingMetrics> =>
  request.get({ route: routes.landing.metrics });

const openMetrics = (): Promise<ILandingOpenMetrics> =>
  request.get({ route: routes.landing.openMetrics });

const landing = {
  metrics,
  openMetrics,
};

export default landing;
