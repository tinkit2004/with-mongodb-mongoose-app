import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import skillImage from "../public/Reactjs_icon.png";
export default function SkillsItem() {
  return (
    <Box w="20vw" h="350px" boxShadow="lg" bg="white" px="20" pt="5">
      <Image src={skillImage} layout="responsive" />
      <Text fontSize="md" align="center">
        Frontend
      </Text>
    </Box>
  );
}
