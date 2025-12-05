export const API_BASE_URLS = {
  sandbox: "https://fast.track.staging.croupier147.com/api/v1",
  prod: "https://fast.track.croupier147.com/api/v1",
};

export const API = {
  baseURL: API_BASE_URLS.sandbox,
  error: {
    aborted: {
      code: "ECONNABORTED",
      description: "Please check your network connection and try again",
      message: "Network Error!",
    },
    expiredToken: "Access denied. Token Expired",
  },
  routes: {
    auth: {
      verfiyCode: "/verify_invite_code?invite_code=%invite_code%",
      verifyUsername: "/verify_username?username=%username%",
      signUp: "/users",
      signIn: "/users/sign_in",
      forgotPassword: "/send_password_reset_instruction",
      resetPassword: "/reset_password",
      userProfile: "/profile_data",
    },
    landing: {
      metrics: "/landing_metrics",
      openMetrics: "/open_activity_stats",
    },
    scan: {
      scan: "/scans",
      uploadProduct: "/upload_records",
      myScans: "/my_scans",
      topScans: "/top_scans",
      recentScans: "/recent_scans",
      myUploads: "/my_uploads",
    },
    product: {
      getProductDetails: "/products/%product_id%",
      getProductReviews: "/product_reviews?product_id=%product_id%",
      getUserProductReview: "/user_product_review?product_id=%product_id%",
      addProductReview: "/product_reviews",
      editProductReview: "/reviews/%review_id%",
    },
    company: {
      getCompanyDetails: "/companies/%company_id%",
      getCompanyReviews: "/company_reviews?company_id=%company_id%",
      getUserCompanyReview: "/user_company_review?company_id=%company_id%",
      addCompanyReview: "/company_reviews",
      editCompanyReview: "/reviews/%review_id%",
    },
    search: {
      search: "/search?q=%query%&page=1&per_page=50",
      incrementProductSearch: "/products/%product_id%/increment_search",
      incrementCompanySearch: "/companies/%company_id%/increment_search",
    },
    profile: {
      updateProfile: "/update_profile",
      updatePassword: "/update_password",
    },
  },
  timeout: 500000,
};

export const COOKIES = {
  key: "croupier-user",
};

const constants = {
  API,
  COOKIES,
};

export default constants;
