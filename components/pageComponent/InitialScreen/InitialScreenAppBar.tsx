import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import { images } from "@/icons";
import { View } from "react-native";

const InitialScreenAppBar = () => {
  return (
    <View className="flex flex-row items-center justify-between mb-3 px-5">
      <InterBoldText text="Welcome 👋🏼" className=" text-[24px]" />

      <CroupierImage
        source={images.croupierLogo}
        alt="logo"
        className="w-[44px] h-[44px]"
      />
    </View>
  );
};

export default InitialScreenAppBar;
