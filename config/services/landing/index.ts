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

export interface IHomeTopScan {
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

const metrics = (): Promise<ILandingMetrics> =>
  request.get({ route: routes.landing.metrics });

const openMetrics = (): Promise<ILandingOpenMetrics> =>
  request.get({ route: routes.landing.openMetrics });

const landing = {
  metrics,
  openMetrics,
};

export default landing;
