import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import { images } from "@/icons";
import { View } from "react-native";

type AppbarProps = {
  username?: string;
  title?: string;
};

const HomeAppbar = ({ username, title }: AppbarProps) => {
  return (
    <View className="flex flex-row items-center justify-between mb-3 px-5">
      {title?.length! > 0 ? (
        <InterBoldText text={title ?? ""} className="text-[24px]" />
      ) : username == undefined ? (
        <InterBoldText text="Welcome 👋🏼" className="text-[24px]" />
      ) : (
        <View className="flex flex-row items-center">
          <InterBoldText
            text="Hi, "
            className="text-[24px] text-text-neutral"
          />
          <InterBoldText text={`@${username}`} className="text-[24px]" />
        </View>
      )}

      <CroupierImage
        source={images.croupierLogo}
        alt="logo"
        className="w-[44px] h-[44px]"
      />
    </View>
  );
};

export default HomeAppbar;
