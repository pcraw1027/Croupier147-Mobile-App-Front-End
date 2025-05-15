import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InterSemiboldText from "./Text/InterSemiboldText";

declare interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton = ({
  onPress,
  title,
  backgroundColor,
  textColor,
  disabled,
  loading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress} {...props}>
      <View
        className={`w-full rounded-[16px] flex py-[20px] flex-row items-center justify-center bg-accent-1 ${
          disabled ? "opacity-80" : "opacity-100"
        } ${className}`}
      >
        {loading ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <InterSemiboldText
            text={title}
            className={`text-[18px] text-pry ${textColor}`}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;
