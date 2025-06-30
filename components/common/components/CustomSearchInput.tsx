import { icons } from "@/icons";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CroupierImage from "./CroupierImage";
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
  returnKeyType?: ReturnKeyTypeOptions;
  hasCancel?: boolean;
  hasClear?: boolean;
  onCancel?: () => void;
  onClear?: () => void;
}

const CustomSearchInputField = ({
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
  multiline = false,
  numberOfLines = 1,
  textarea = false,
  returnKeyType,
  hasCancel,
  onCancel,
  hasClear,
  onClear,
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
    <View className="flex flex-row w-full">
      <View
        className={`flex-1 h-[60px] relative rounded-[16px] border border-stroke ${
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
          autoCapitalize={
            keyboardType == "email-address" ? "none" : "sentences"
          }
          secureTextEntry={showPassword}
          editable={!disabled}
          onChangeText={onChangeText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          returnKeyType={returnKeyType}
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

        {hasClear && value.length > 0 && (
          <TouchableWithoutFeedback onPress={() => onClear!()}>
            <View className="absolute right-[5px] py-[20px]">
              <CroupierImage
                source={icons.closeIcon}
                className="w-[24px] h-[24px]"
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {hasCancel && (
        <TouchableWithoutFeedback onPress={() => onCancel!()}>
          <View className="flex items-center justify-center ml-[10px]">
            <InterMediumText text="Cancel" className=" text-accent-2" />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default CustomSearchInputField;
