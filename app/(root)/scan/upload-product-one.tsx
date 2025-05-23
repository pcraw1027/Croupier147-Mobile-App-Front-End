import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import InterText from "@/components/common/components/Text/InterText";
import helpers from "@/components/common/utils/helper";
import useStore from "@/config/store";
import { icons } from "@/icons";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

interface Image {
  uri: string;
  fileName?: string;
  type?: string;
}

const UploadProductOnePage = () => {
  const cameraRef = useRef<any>(null);
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<Image[]>([]);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const router = useRouter();

  const upload = useStore((state) => state.upload);
  const setUpload = useStore((state) => state.setUpload);

  const isPermissionGranted = Boolean(permission?.granted);

  useEffect(() => {
    if (!isPermissionGranted) {
      requestPermission();
    }
  }, [isFocused]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photo]);
      setIsPreviewVisible(true);
    }
  };

  const deletePhoto = (indexToRemove: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleContinue = () => {
    setUpload({ ...upload, images: photos });
    router.push("/(root)/scan/upload-product-two");
  };

  return (
    <>
      <ToastManager
        showCloseIcon={false}
        duration={5000}
        animationStyle="upInUpOut"
        animationOutTiming={500}
        animationInTiming={500}
        width={300}
        textStyle={{
          fontSize: 12,
          fontFamily: "Inter-Medium",
        }}
      />
      {isPreviewVisible == false ? (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
          {isFocused && (
            <View style={StyleSheet.absoluteFillObject}>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                ref={cameraRef}
              />
              <TouchableOpacity onPress={() => takePhoto()}>
                <View className="h-screen w-full">
                  <View className="border-2 border-white w-[74px] h-[74px] rounded-full flex items-center justify-center fixed bottom-[-80%] left-1/2 -translate-x-1/2">
                    <View className="bg-white w-[64px] h-[64px] rounded-full"></View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      ) : (
        <SafeAreaView className="bg-white h-screen">
          <View className="flex flex-row items-center justify-between mb-10 px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <CroupierImage
                source={icons.backIcon}
                className="w-[40px] h-[40px]"
              />
            </TouchableOpacity>

            <InterSemiboldText
              text="Upload product"
              className="text-pry text-2xl"
            />

            <View className="w-[20px]" />
          </View>

          <ScrollView className="px-5 h-screen">
            <View className="flex flex-col justify-between">
              <View className="h-[72vh]">
                <InterSemiboldText
                  text="STEP 1 OF 2"
                  className="text-accent-2 tracking-[2px] mb-1"
                />
                <InterBoldText text="Add photos" className="text-[28px] mb-2" />
                <InterText
                  text="Click Next if you’re happy with this picture, or click “+” to take another"
                  className="text-[16px] text-text-neutral mb-10"
                />
                <View className={`flex flex-row flex-wrap gap-y-6 gap-x-5`}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (photos.length < 5) {
                        setIsPreviewVisible(false);
                      } else {
                        helpers.openNotification({
                          message: "You can only upload 5 photos",
                          type: "error",
                        });
                      }
                    }}
                  >
                    <View>
                      <CroupierImage
                        source={icons.addBox}
                        className="w-[100px] h-[100px]"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  {photos?.map((photoUri, index) => (
                    <View key={index} className="relative">
                      <CroupierImage
                        source={{ uri: photoUri.uri }}
                        className="w-[100px] h-[100px] rounded-2xl"
                        resizeMode="cover"
                      />

                      <TouchableWithoutFeedback
                        onPress={() => deletePhoto(index)}
                      >
                        <View className="absolute top-2 right-2">
                          <CroupierImage
                            source={icons.deleteIcon}
                            className=" w-[24px] h-[24px]"
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
                </View>
              </View>

              <View>
                <CustomButton title="Next" onPress={() => handleContinue()} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default UploadProductOnePage;
