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

export interface IProduct extends ApiResponse {
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

const productDetails = (product_id: string): Promise<IProduct> =>
  request.get({
    route: routes.product.getProductDetails.replace("%product_id%", product_id),
  });

const product = {
  productDetails,
};

export default product;
