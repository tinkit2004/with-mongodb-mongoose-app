import React from "react";
import { useToken, Text, Box, VStack } from "@chakra-ui/react";
import { mq } from "../../theme";
import Title from "../Title/title";
import { topVariant } from "../../animation/animation";
import CustomButton from "../CustomButton/CustomButton";
import { motion } from "framer-motion";
export default function Contact() {
  const [linearGradient] = useToken("bgGradient", ["linearGradient"]);
  const MotionBox = motion(Box);
  return (
    <Box
      align="center"
      w="100%"
      h="100%"
      pb="10%"
      pt={[8, 8, 8, 24]}
      px={[5, 20, 30, 60]}
      bgGradient={linearGradient}
      color="white"
      borderTop="0px"
      css={mq({
        clipPath: [
          "none",
          "none",
          "none",
          "polygon(0 15vh, 100% 0, 100% 100%, 0 100%)",
        ],
      })}
    >
      <MotionBox variants={topVariant} initial="hidden" whileInView="visible">
        <Title align="center" mt={[0, 0, 4]} color="white">
          Contact
        </Title>
        <MotionBox variants={topVariant}>
          <Text align="center" fontSize={["md", "2xl"]} mb={[8, 6]}>
            Would you like to work with me? Awesome!
          </Text>
          <CustomButton
            size="lg"
            textHoverGradientColor={linearGradient}
            buttonHoverColor="white"
          >
            Connect
          </CustomButton>
        </MotionBox>
      </MotionBox>
    </Box>
  );
}
