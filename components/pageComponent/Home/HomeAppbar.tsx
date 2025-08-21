import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterMediumText from "@/components/common/components/Text/InterMediumText";
import { images } from "@/icons";
import { View } from "react-native";

type AppbarProps = {
  username?: string;
  title?: string;
  showSandbox?: boolean;
};

const HomeAppbar = ({ username, title, showSandbox }: AppbarProps) => {
  return (
    <View className="flex flex-row items-center justify-between my-3 px-5">
      {title?.length! > 0 ? (
        <InterBoldText text={title ?? ""} className="text-2xl" />
      ) : username == undefined ? (
        <InterBoldText text="Welcome 👋🏼" className="text-2xl" />
      ) : (
        <View className="flex flex-row items-center">
          <InterBoldText text="Hi, " className="text-2xl text-text-neutral" />
          <InterBoldText text={`@${username}`} className="text-2xl" />
        </View>
      )}

      <View className="flex flex-row items-center justify-center gap-x-1">
        {showSandbox ? (
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

export default HomeAppbar;
