import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionButton = motion(Button);

const CustomButton = ({
  children,
  buttonHoverColor,
  buttonHoverBrightness,
  textHoverColor,
  textHoverGradientColor,

  ...otherProps
}: {
  children: React.ReactNode;
  buttonHoverColor: string;
  buttonHoverBrightness: string;
  textHoverColor: string;
  textHoverGradientColor: string;
  fontSize: string;
  as: string;
  href: string;
  bg: string;
}) => (
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
export default CustomButton;
