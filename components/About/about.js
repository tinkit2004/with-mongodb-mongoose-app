/** @jsxImportSource @emotion/react */
import React from "react";
import { Box, VStack, SimpleGrid } from "@chakra-ui/react";
import { useToken } from "@chakra-ui/react";

import { mq } from "../../theme/index";
import Title from "../Title/title";

import ImagePic from "../ImagePic/ImagePic";
import ProfileDescription from "../ProfileDescription/ProfileDescription";
import CustomButton from "../CustomButton/CustomButton";
import { motion } from "framer-motion";
import {
  topVariant,
  leftFadeInVariant,
  rightFadeInVariant,
} from "../../animation/animation";
export default function About() {
  const [linearGradient] = useToken("bgGradient", ["linearGradient"]);
  const MotionSimpleGrid = motion(SimpleGrid);
  const MotionVStack = motion(VStack);
  const MotionBox = motion(Box);
  return (
    <Box
      h="100%"
      pt={16}
      px={[5, 20, 30, 60]}
      bgGradient={linearGradient}
      color="white"
      borderTop="0px"
      pb="10%"
      css={mq({
        clipPath: [
          "none",
          "none",
          "none",
          "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
        ],
      })}
    >
      <Title
        fontSize={["md", "lg"]}
        variants={topVariant}
        initial="hidden"
        whileInView="visible"
      >
        About Me
      </Title>
      <MotionSimpleGrid
        columns={[1, 2]}
        variants={topVariant}
        initial="hidden"
        whileInView="visible"
      >
        <MotionBox width="100%" align="center" variants={leftFadeInVariant}>
          <ImagePic imagePic={"/profile_template.jpg"} maxW={300} />
        </MotionBox>
        <MotionVStack
          variants={rightFadeInVariant}
          align={["center", "center", "start"]}
          p={[7, 5]}
        >
          <ProfileDescription mb={[4, 2, 0]} />
          <CustomButton
            fontSize="xs"
            textHoverGradientColor={linearGradient}
            buttonHoverColor="white"
            as="a"
            href="https://www.linkedin.com/in/andy-fung-739a15123"
          >
            Connect me on LinkedIn
          </CustomButton>
        </MotionVStack>
      </MotionSimpleGrid>
    </Box>
  );
}
