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
    country: string;
    invite_code: string | null;
    postal_code: string;
    role: string;
    status: string;
  };
}

const verifyCode = (invite_code: string): Promise<ApiResponse> =>
  request.get({
    route: routes.auth.verfiyCode.replace(
      "%invite_code%",
      invite_code.toString()
    ),
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
};

export default auth;
