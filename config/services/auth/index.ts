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

interface IPostRegister extends ApiResponse {
  message: string;
  token: string;
  user: {
    country: string;
    email: string;
    id: number;
    invite_code: string | null;
    postal_code: string;
    username: string;
  };
}

export interface ILogin extends ApiResponse {
  message: string;
  token: string;
  user: {
    country: string;
    email: string;
    id: number;
    invite_code: string | null;
    postal_code: string;
    username: string;
  };
}

export interface IUserProfile extends ApiResponse {
  user_profile: {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    country: string;
    invite_code: string | null;
    postal_code: string;
    role: string;
    status: string;
    app_notify_on?: boolean;
    email_notify_on?: boolean;
  };
}

const verifyCode = (invite_code: string): Promise<ApiResponse> =>
  request.get({
    route: routes.auth.verfiyCode.replace(
      "%invite_code%",
      invite_code.toString()
    ),
  });

const verifyUsername = (username: string): Promise<ApiResponse> =>
  request.get({
    route: routes.auth.verifyUsername.replace("%username%", username),
  });

const register = (payload: Payload): Promise<IPostRegister> =>
  request.post({
    payload,
    route: routes.auth.signUp,
  });

const login = (payload: Payload): Promise<ILogin> =>
  request.post({ payload, route: routes.auth.signIn });

const forgotPassword = (payload: Payload): Promise<ApiResponse> =>
  request.post({ payload, route: routes.auth.forgotPassword });

const resetPassword = (payload: Payload): Promise<ApiResponse> =>
  request.post({ payload, route: routes.auth.resetPassword });

const userProfile = (): Promise<IUserProfile> =>
  request.get({ route: routes.auth.userProfile });

const auth = {
  login,
  register,
  forgotPassword,
  resetPassword,
  userProfile,
  verifyCode,
  verifyUsername,
};

export default auth;
