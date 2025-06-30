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

export interface SearchCompanies {
  id?: number;
  name?: string;
  logo?: string;
}

export interface SearchProducts {
  id?: number;
  name?: string;
  description?: string;
  product_company_id?: number;
  company_name?: string;
  media?: {
    file?: string;
  }[];
}

export interface ISearch extends ApiResponse {
  results: {
    products: SearchProducts[];
    companies: SearchCompanies[];
  };
}

const searchProductOrCompany = (query: string): Promise<ISearch> =>
  request.get({
    route: routes.search.search.replace("%query%", query),
  });

const incrementCompanySearch = (id: string): Promise<ApiResponse> =>
  request.put({
    route: routes.search.incrementCompanySearch.replace("%company_id%", id),
  });

const incrementProductSearch = (id: string): Promise<ApiResponse> =>
  request.put({
    route: routes.search.incrementProductSearch.replace("%product_id%", id),
  });

const search = {
  searchProductOrCompany,
  incrementCompanySearch,
  incrementProductSearch,
};

export default search;
