import { Toast } from "toastify-react-native";

export interface INotification {
  type: "success" | "error" | "info";
  message: any;
}

const openNotification = ({ type, message }: INotification): void => {
  Toast[type](message, "top");
};

const helpers = {
  openNotification,
};

export default helpers;
