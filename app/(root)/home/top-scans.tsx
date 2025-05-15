import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import ProductScanCard from "@/components/pageComponent/Home/ProductScanCard";
import scan, { IMyScan } from "@/config/services/scan";
import { icons, images } from "@/icons";
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

const TopScans = () => {
  const router = useRouter();
  const [topScans, setTopScans] = useState<IMyScan[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTopScans();
  }, []);

  const getTopScans = async () => {
    setLoading(true);
    try {
      const response = await scan.topScans();

      setTopScans(response.records);
    } catch (error) {
      console.error("Error fetching landing metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white-alt">
      <View className="bg-white-alt flex flex-col h-screen px-5">
        <View className="flex flex-row items-center justify-between mb-3 ">
          <TouchableOpacity onPress={() => router.back()}>
            <CroupierImage
              source={icons.backIcon}
              className="w-[40px] h-[40px]"
            />
          </TouchableOpacity>

          <InterBoldText text="Top Scans" className="text-pry text-[24px]" />

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
            topScans?.map((scan) => (
              <ProductScanCard
                key={scan.id}
                title={scan.name ?? ""}
                company="Procter & Gamble"
                image={images.shampoo}
                rating="3.5"
                className="bg-blue-light"
              />
            ))
          )}
        </ScrollView>
      </View>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default TopScans;
