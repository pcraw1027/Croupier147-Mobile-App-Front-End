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
    searches?: number;
  };
  scans?: number;
  company_name?: string;
  product_variants: {
    product_variant: {
      id: number;
      product_id?: number;
      barcode?: string;
    };
    media: {
      file: {
        url: string;
      };
    }[];
  }[];
  rating_distribution: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
  };
  review_stats: {
    average_ratings?: number;
    total_ratings?: number;
    total_reviews?: number;
  };
}

export interface IReviews extends ApiResponse {
  records: Reviews[];
}

interface Reviews {
  id: number;
  rating?: number;
  comment?: string;
  title?: string;
  username?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUserReview extends ApiResponse {
  id?: number;
  rating?: number;
  comment?: string;
  title?: string;
  created_at?: string;
  updated_at?: string;
}

const productDetails = (product_id: string): Promise<IProduct> =>
  request.get({
    route: routes.product.getProductDetails.replace("%product_id%", product_id),
  });

const productReviews = (product_id: string): Promise<IReviews> =>
  request.get({
    route: routes.product.getProductReviews.replace("%product_id%", product_id),
  });

const userProductReview = (product_id: string): Promise<IReviews> =>
  request.get({
    route: routes.product.getUserProductReview.replace(
      "%product_id%",
      product_id
    ),
  });

const addProductReview = (payload: Payload): Promise<ApiResponse> =>
  request.post({
    payload,
    route: routes.product.addProductReview,
  });

const editProductReview = (
  payload: Payload,
  reviewId: string
): Promise<ApiResponse> =>
  request.put({
    payload,
    route: routes.product.editProductReview.replace("%review_id%", reviewId),
  });

const product = {
  productDetails,
  productReviews,
  userProductReview,
  addProductReview,
  editProductReview,
};

export default product;
