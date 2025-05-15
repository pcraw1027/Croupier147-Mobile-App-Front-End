import React from "react";
import { Text } from "react-native";

declare interface TextProps {
  text: string;
  className?: string;
}

const InterMediumText = ({ text, className = "text-pry" }: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "InterMedium",
      }}
      className={className}
    >
      {text}
    </Text>
  );
};

export default InterMediumText;
