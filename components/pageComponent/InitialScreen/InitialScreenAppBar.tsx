import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import useStore from "@/config/store";
import { images } from "@/icons";
import { View } from "react-native";

const InitialScreenAppBar = () => {
  const environment = useStore((state) => state.environment);

  return (
    <View className="flex flex-row items-center justify-between mb-3 px-5">
      <InterBoldText text="Welcome 👋🏼" className=" text-[24px]" />

      <View className="flex flex-row items-center justify-center gap-x-1">
        {environment.sandbox ? (
          <View className="px-2 py-1 bg-blue-light rounded-full">
            <InterMediumText text="Sandbox" className="text-blue-800 text-xs" />
          </View>
        ) : null}
        <CroupierImage
          source={images.croupierLogo}
          alt="logo"
          className="w-[2.75rem] h-[2.75rem]"
        />
      </View>
    </View>
  );
};

export default InitialScreenAppBar;
