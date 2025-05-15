import React from "react";
import { Text } from "react-native";

declare interface TextProps {
  text: string;
  className?: string;
}

const InterBoldText = ({ text, className = "text-pry" }: TextProps) => {
  return (
    <Text
      style={{
        fontFamily: "InterBold",
      }}
      className={className}
    >
      {text}
    </Text>
  );
};

export default InterBoldText;
