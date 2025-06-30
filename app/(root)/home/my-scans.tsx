import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import ProductScanCard from "@/components/pageComponent/Home/ProductScanCard";
import scan, { IMyScan } from "@/config/services/scan";
import { icons } from "@/icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const bgColors = [
  "bg-blue-light",
  "bg-green-light",
  "bg-red-light",
  "bg-purple-light",
  "bg-amber-light",
];

const getRandomBg = () => bgColors[Math.floor(Math.random() * bgColors.length)];

const MyScans = () => {
  const router = useRouter();
  const [myScans, setMyScans] = useState<IMyScan[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyScans();
  }, []);

  const getMyScans = async () => {
    setLoading(true);
    try {
      const response = await scan.myScans();

      setMyScans(response.records);
    } catch (error) {
      console.error("Error fetching landing metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white-alt">
      <View className="bg-white-alt flex flex-col h-screen px-5">
        <View className="flex flex-row items-center justify-between my-3 ">
          <TouchableOpacity onPress={() => router.back()}>
            <CroupierImage
              source={icons.backIcon}
              className="w-[40px] h-[40px]"
            />
          </TouchableOpacity>

          <InterBoldText text="My Scans" className="text-pry text-2xl" />

          <View className="w-[20px]" />
        </View>

        <ScrollView
          contentContainerClassName="pb-[70px]"
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View className="flex items-center justify-center h-[90vh]">
              <ActivityIndicator size="large" />
            </View>
          ) : (
            myScans?.map((scan, idx) => (
              <ProductScanCard
                key={idx}
                title={scan?.product_data?.product_variant?.product_name ?? ""}
                company={
                  scan?.product_data?.product_variant?.company_name ?? ""
                }
                image={{
                  uri: scan?.product_data?.media?.[0]?.file?.url,
                }}
                rating={
                  scan?.product_data?.product_variant?.avrg_rating?.toString() ??
                  "0"
                }
                scanCount={scan.product_data?.scan_count?.toString() ?? "0"}
                productId={scan.product_data?.product_variant?.product_id?.toString()}
                className="bg-white border border-stroke"
              />
            ))
          )}
        </ScrollView>
      </View>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default MyScans;
