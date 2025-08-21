import CroupierImage from "@/components/common/components/CroupierImage";
import CustomButton from "@/components/common/components/CustomButton";
import CustomInputField from "@/components/common/components/CustomInputField";
import InterBoldText from "@/components/common/components/Text/InterBoldText";
import InterSemiboldText from "@/components/common/components/Text/InterSemiboldText";
import helpers from "@/components/common/utils/helper";
import scan from "@/config/services/scan";
import useStore from "@/config/store";
import { icons, images } from "@/icons";
import logger from "@/logger.config";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

const UploadProductTwoPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    productName: "",
    companyName: "",
    remark: "",
  });
  const upload = useStore((state) => state.upload);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async ({}, { setSubmitting }) => {
      try {
        const payload = {
          productName: form.productName,
          companyName: form.companyName,
          remark: form.remark,
          barcode: upload.barcode,
          barcodeSymbology: upload.barcode_symbology,
          image: upload.images,
          scanId: upload.scanId,
        };

        const formData = new FormData();

        formData.append("upload_record[barcode]", payload.barcode);
        formData.append("upload_record[symbology]", payload.barcodeSymbology);
        formData.append("upload_record[product_name]", payload.productName);
        formData.append("upload_record[company_name]", payload.companyName);
        formData.append("upload_record[remarks]", payload.remark);
        formData.append("upload_record[scan_id]", payload.scanId.toString());

        upload.images.forEach((image, index) => {
          formData.append(`upload_record[media_attributes][${index}][file]`, {
            uri: image.uri,
            name: image.fileName || `image_${index}.jpg`,
            type: image.type || "image/jpeg",
          } as any);
        });

        const response = await scan.uploadProduct(formData);

        helpers.openNotification({
          message: response.message,
          type: "success",
        });

        router.replace("/(root)/scan/upload-success");
      } catch (error: any) {
        console.log(error);
        helpers.openNotification({
          message: error.message,
          type: "error",
        });
        return logger(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { handleSubmit, isSubmitting } = formik;

  return (
    <SafeAreaView className="bg-white-alt h-screen">
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
      <View className="flex flex-row items-center justify-between mt-3 mb-10 px-5">
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <ScrollView className="px-5" keyboardShouldPersistTaps="handled">
          <View className="mb-20">
            <InterSemiboldText
              text="STEP 2 OF 2"
              className="text-sm text-accent-2 tracking-[2px] mb-1"
            />
            <InterBoldText
              text="Enter product details"
              className="text-2xl mb-12"
            />

            <View className="flex flex-row items-center justify-between bg-white min-w-[17.5rem] px-6 py-4 rounded-[8px] mb-14">
              <View className="mr-5">
                <InterSemiboldText
                  text="BARCODE"
                  className="text-xs text-text-neutral tracking-wider"
                />
                <InterSemiboldText text={upload.barcode} className="text-2xl" />
              </View>
              <CroupierImage
                source={images.barcode}
                className="w-[52px] h-[38px]"
              />
            </View>

            <CustomInputField
              label="Product name"
              value={form.productName}
              onChangeText={(value) => {
                setForm({ ...form, productName: value });
              }}
              className="mb-8"
              autoCapitalize="words"
            />

            <CustomInputField
              label="Company name"
              value={form.companyName}
              onChangeText={(value) => {
                setForm({ ...form, companyName: value });
              }}
              className="mb-8"
              autoCapitalize="words"
            />

            <CustomInputField
              label="Enter remark (optional)"
              value={form.remark}
              onChangeText={(value) => {
                setForm({ ...form, remark: value });
              }}
              className="!h-[150px]"
              numberOfLines={4}
              multiline={true}
              textarea={true}
            />
          </View>

          <View className="flex flex-row gap-x-5">
            <CustomButton
              title="Cancel"
              className="!w-[120px] bg-green-light"
            />

            <CustomButton
              title="Submit"
              className="flex-1"
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={() => handleSubmit()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadProductTwoPage;
