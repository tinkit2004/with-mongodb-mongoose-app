import React from "react";
import { Box } from "@chakra-ui/react";
import styles from "./WordleSquare.module.css";
export default function WordleSquare({ children, className }) {
  return (
    <Box
      w="60px"
      h="60px"
      display="block"
      border="1px solid #bbb"
      m="4px"
      textAlign="center"
      lineHeight="60px"
      textTransform="uppercase"
      fontWeight="bold"
      fontSize="2.5em"
      className={styles[className]}
    >
      {children}
    </Box>
  );
}
