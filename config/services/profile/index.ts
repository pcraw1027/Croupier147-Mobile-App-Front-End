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

const updateProfile = (payload: Payload): Promise<ApiResponse> =>
  request.put({ payload, route: routes.profile.updateProfile });

const updatePassword = (payload: Payload): Promise<ApiResponse> =>
  request.put({ payload, route: routes.profile.updatePassword });

const profile = {
  updateProfile,
  updatePassword,
};

export default profile;
