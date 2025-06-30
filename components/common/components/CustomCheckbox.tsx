import { TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import InterMediumText from "./Text/InterMediumText";

declare interface CheckboxProps {
  label: string;
  className?: string;
  isChecked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomCheckbox = ({
  label,
  className,
  isChecked,
  setChecked,
}: CheckboxProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => setChecked(!isChecked)}>
      <View className={`flex flex-row items-start ${className}`}>
        <View
          className={`${
            isChecked ? "bg-accent-2" : "border-2 border-stroke"
          } w-[18px] h-[18px]  flex items-center justify-center rounded mt-1`}
        >
          {isChecked && <Icon name="check" color="#ffffff" size={16} />}
        </View>
        <InterMediumText
          text={label}
          className="ml-[8px] text-[16px] text-text-neutral leading-6"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomCheckbox;
