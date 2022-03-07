import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionButton = motion(Button);

export default function CustomButton({
  children,

  buttonHoverColor,
  buttonHoverBrightness,
  textHoverColor,
  textHoverGradientColor,

  ...otherProps
}) {
  return (
    <MotionButton
      flexShrink={0}
      {...otherProps}
      color="white"
      px={0}
      variant="outline"
      _hover={{
        background: buttonHoverColor,
        filter: "auto",
        brightness: buttonHoverBrightness,
      }}
    >
      <Flex
        p={5}
        h="100%"
        width="100%"
        align="center"
        justifyContent="center"
        _hover={{
          bgGradient: textHoverGradientColor,
          bgClip: "text",
          color: textHoverColor,
        }}
      >
        <Text textAlign="center"> {children}</Text>
      </Flex>
    </MotionButton>
  );
}
