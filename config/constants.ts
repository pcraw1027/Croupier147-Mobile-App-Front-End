const ENVIRONMENT = {
  development: process.env.NEXT_PUBLIC_ENVIRONMENT === "development",
  production: process.env.NEXT_PUBLIC_ENVIRONMENT === "production",
};

const API = {
  baseURL: "https://fast.track.croupier147.com/api/v1",
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
    },
    product: {
      getProductDetails: "/products/%product_id%",
    },
  },
  timeout: 500000,
};

const COOKIES = {
  key: "croupier-user",
};

const constants = {
  API,
  COOKIES,
  ENVIRONMENT,
};

export default constants;
