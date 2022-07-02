import React from "react";
import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionTitle = motion(Text);
export default function Title({ variants, children, ...otherProps }) {
  return (
    <MotionTitle
      align="center"
      fontSize={["3xl", "5xl"]}
      fontWeight="bold"
      textTransform="uppercase"
      pb={10}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      {...otherProps}
    >
      {children}
    </MotionTitle>
  );
}
