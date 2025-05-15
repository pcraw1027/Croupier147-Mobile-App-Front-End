import React from "react";
import { Text } from "react-native";

declare interface TextProps {
  text: string;
  className?: string;
}

const InterText = ({ text, className = "text-pry" }: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "InterRegular",
      }}
      className={className}
    >
      {text}
    </Text>
  );
};

export default InterText;
