import { TouchableWithoutFeedback, View } from "react-native";
import InterMediumText from "./Text/InterMediumText";
// import Icon from "react-native-vector-icons/MaterialIcons";

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
  //   const [isChecked, setChecked] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setChecked(!isChecked)}>
      <View className={`flex flex-row items-start ${className}`}>
        <InterMediumText
          text={label}
          className="ml-[8px] text-[16px] text-text-neutral"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomCheckbox;
