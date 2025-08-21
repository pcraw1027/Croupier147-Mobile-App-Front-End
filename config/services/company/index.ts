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

export interface ICompany extends ApiResponse {
  level_1_flag?: boolean;
  company: {
    id: number;
    name?: string;
    industry_category_type_id?: number;
    sector?: string;
    logo?: {
      url: string;
    };
    searches?: number;
    black_owned?: boolean;
    female_owned?: boolean;
  };
  parent_company?: {
    parent_company?: {
      name?: string;
      id?: number;
    };
  };
  company_ceo?: {
    id?: number;
    first_name?: string;
    last_name?: string;
  };
  company_snapshot?: {
    id?: number;
    company_id?: number;
    employee_demographics_transparency?: string;
    employee_demographics_performance?: string;
    projected_culture_and_identity?: string;
    mgmt_composition_transparency?: string;
    mgmt_composition_performance?: string;
  };
  subsidiaries?: {
    title?: string;
    subsidiaries_companies?: {
      child_company?: {
        id?: number;
        name?: string;
        logo?: {
          url?: string;
        };
      };
    }[];
  };
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

const companyDetails = (company_id: string): Promise<ICompany> =>
  request.get({
    route: routes.company.getCompanyDetails.replace("%company_id%", company_id),
  });

const companyReviews = (company_id: string): Promise<IReviews> =>
  request.get({
    route: routes.company.getCompanyReviews.replace("%company_id%", company_id),
  });

const userCompanyReview = (company_id: string): Promise<IReviews> =>
  request.get({
    route: routes.company.getUserCompanyReview.replace(
      "%company_id%",
      company_id
    ),
  });

const addCompanyReview = (payload: Payload): Promise<ApiResponse> =>
  request.post({
    payload,
    route: routes.company.addCompanyReview,
  });

const editCompanyReview = (
  payload: Payload,
  reviewId: string
): Promise<ApiResponse> =>
  request.put({
    payload,
    route: routes.company.editCompanyReview.replace("%review_id%", reviewId),
  });

const company = {
  companyDetails,
  companyReviews,
  userCompanyReview,
  addCompanyReview,
  editCompanyReview,
};

export default company;
