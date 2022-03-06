import Link from "next/link";
import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, useToken, Text, Flex, Icon } from "@chakra-ui/react";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  const [darkGrey] = useToken("colors", ["darkGrey"]);
  return (
    <Box
      padding={10}
      bg={darkGrey}
      h="100%"
      px={[5, 20, 30, 60]}
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      <Box justifyContent="center" display="flex">
        <ChevronUpIcon
          as="a"
          cursor="pointer"
          onClick={() => scroll.scrollToTop({ duration: 1000, smooth: true })}
          color="white"
          boxSize={8}
          mb={8}
        />
      </Box>
      <Flex justify="center">
        <Box mx={8} as="a" href="https://github.com/tinkit2004">
          <FontAwesomeIcon icon={faGithubSquare} inverse size="3x" />
        </Box>
        <Box
          mx={8}
          as="a"
          href="https://www.linkedin.com/in/andy-fung-739a15123"
        >
          <FontAwesomeIcon icon={faLinkedin} inverse size="3x" />
        </Box>
      </Flex>
      <hr className={styles.hr} />
      <Text color="white" align="center">
        © {new Date().getFullYear()} - Developed by Andy Fung{" "}
      </Text>
    </Box>
    /* <Box padding={10} bg={darkGrey} h="100%" px={[5, 20, 30, 60]} justifyContent="center" display="flex" flexDirection="column">
        <Box justifyContent="center" display="flex">
          <ChevronUpIcon
            as="a"
            cursor="pointer"
            // onClick={() => scroll.scrollToTop({ duration: 1000, smooth: true })}
            color="white"
            boxSize={8}
            mb={8}
          />
        </Box>
        <Flex justify="center">
          <Box mx={8} as="a" href="https://github.com/tinkit2004">
            {/* <FontAwesomeIcon icon={brands("github-square")} inverse size="3x" /> */
    //         </Box>
    //         <Box
    //           mx={8}
    //           as="a"
    //           href="https://www.linkedin.com/in/andy-fung-739a15123"
    //         >
    //           {/* <FontAwesomeIcon icon={brands("linkedin-in")} inverse size="3x" /> */}
    //         </Box>
    //       </Flex>
    //       <hr className={styles.hr} />
    //       <Text color="white" align="center">
    //         {/* © {new Date().getFullYear()} - Developed by Andy Fung */}
    //       </Text>
    //     </Box> */}
  );
}
