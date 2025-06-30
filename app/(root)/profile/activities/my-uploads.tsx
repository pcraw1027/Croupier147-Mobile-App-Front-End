import CroupierImage from "@/components/common/components/CroupierImage";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import ProductUploadCard from "@/components/pageComponent/Home/ProductUploadCard";
import scan, { IUploads } from "@/config/services/scan";
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

const MyUploads = () => {
  const router = useRouter();
  const [myUploads, setMyUploads] = useState<IUploads[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyUploads();
  }, []);

  const getMyUploads = async () => {
    setLoading(true);

    try {
      const response = await scan.myUploads();

      setMyUploads(response.records);
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

          <InterBoldText text="My Uploads" className="text-pry text-2xl" />

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
            myUploads?.map((upload, idx) => (
              <ProductUploadCard
                key={idx}
                title={upload?.upload?.product_name ?? "-"}
                company={upload?.upload?.company_name ?? "-"}
                image={{
                  uri: upload?.media?.[0].file?.url ?? "",
                }}
                uploadDate={upload?.upload?.date}
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

export default MyUploads;
