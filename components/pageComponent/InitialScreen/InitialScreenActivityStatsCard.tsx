import CroupierImage from "@/components/common/components/CroupierImage";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import { icons } from "@/icons";
import { View } from "react-native";

declare interface ActiviyStatProp {
  activityStats: {
    type: string;
    currentMonth: string;
    overall: string;
  };
}

const InitialScreenActivityStatsCard = ({ activityStats }: ActiviyStatProp) => {
  return (
    <View className="shadow-stats-card bg-white rounded-[16px] px-[24px] py-[16px] mb-5">
      <View>
        <View className="flex flex-row items-center justify-between mb-3">
          <InterSemiboldText
            text={
              activityStats.type == "scans"
                ? "Total User Scans"
                : activityStats.type == "products"
                ? "Total Products"
                : activityStats.type == "companies"
                ? "Total Companies"
                : "Total User Uploads"
            }
            className="text-[16px]"
          />
          <CroupierImage
            source={
              activityStats.type == "scans"
                ? icons.greenScan
                : activityStats.type == "products"
                ? icons.redProduct
                : activityStats.type == "companies"
                ? icons.yellowCompany
                : icons.blueUpload
            }
            className="w-[32px] h-[32px]"
          />
        </View>

        <View className="flex flex-row items-center justify-between">
          <View>
            <InterSemiboldText
              text="CURRENT MONTH"
              className="text-text-muted text-[10px] tracking-[1.2px] mb-0.5"
            />
            <InterSemiboldText
              text={
                activityStats.type == "scans"
                  ? activityStats.currentMonth
                  : activityStats.type == "companies"
                  ? activityStats.currentMonth
                  : activityStats.type == "products"
                  ? activityStats.currentMonth
                  : activityStats.currentMonth
              }
              className="text-text-neutral text-[16px]"
            />
          </View>

          <View>
            <InterSemiboldText
              text="OVERALL"
              className="text-text-muted text-[10px] tracking-[1.2px] mb-0.5"
            />
            <InterSemiboldText
              text={
                activityStats.type == "scans"
                  ? activityStats.overall
                  : activityStats.type == "companies"
                  ? activityStats.overall
                  : activityStats.type == "products"
                  ? activityStats.overall
                  : activityStats.overall
              }
              className="text-text-neutral text-[16px] text-right"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default InitialScreenActivityStatsCard;
