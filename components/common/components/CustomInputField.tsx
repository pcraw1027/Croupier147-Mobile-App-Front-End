import { useState } from "react";
import {
  KeyboardTypeOptions,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InterMediumText from "./Text/InterMediumText";

declare interface InputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: string;
  inputStyle?: string;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  textarea?: boolean;
}

const CustomInputField = ({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  className,
  maxLength,
  disabled,
  multiline,
  numberOfLines,
  textarea,
  ...props
}: InputFieldProps) => {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const handleLabelStyle = () => {
    if (focus || value?.length) {
      return true;
    }

    return false;
  };

  return (
    <View
      className={`w-full h-[60px] relative rounded-[16px] border border-stroke ${
        disabled ? "bg-gray-100" : "bg-transparent"
      } ${className}`}
    >
      <InterMediumText
        text={label ?? ""}
        className={`absolute left-[20px] ${
          handleLabelStyle()
            ? "top-[10px] text-[14px]"
            : "top-[20px] text-[16px]"
        } text-text-neutral`}
      />

      <TextInput
        value={value}
        className={`rounded-full px-[20px] font-JakartaSemiBold text-[15px] flex-1 text-left placeholder:text-neutral-300 ${
          textarea ? "pt-[32px]" : "pt-[20px]"
        } ${inputStyle}`}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType == "email-address" ? "none" : "sentences"}
        secureTextEntry={showPassword}
        editable={!disabled}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />

      {secureTextEntry && (
        <TouchableWithoutFeedback
          onPress={() => setShowPassword(!showPassword)}
        >
          <View className="absolute  right-0 p-[20px]">
            <InterMediumText
              text={showPassword ? "Show" : "Hide"}
              className=" text-accent-2"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default CustomInputField;
