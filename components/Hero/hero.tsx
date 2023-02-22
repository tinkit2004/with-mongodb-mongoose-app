import React from "react";
import { Text, Stack, Flex, Image } from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import { useToken } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
export default function Hero() {
  const [linearGradient] = useToken("bgGradient", ["linearGradient"]);
  const headerHeight = useSelector(
    (state: RootState) => state.header.headerHeight
  );
  const contentHeight = `calc((100vh - 32px) - ${headerHeight}px)`;
  return (
    <Stack align="center" justify="center" h={contentHeight}>
      <Image
        borderRadius="full"
        boxSize="150px"
        src="/propic.png"
        alt="Dan Abramov"
      />
      <Text fontSize="6xl" fontWeight="700">
        {"Hi I'm" + " "}
        <Text as="span" bgGradient={linearGradient} bgClip="text">
          Andy
        </Text>
      </Text>
      <Flex flexDirection={["column", "row"]}>
        <Text fontSize="lg" mr={2} textAlign={["center", "start"]}>
          I'm a
        </Text>
        <Text as="span" fontSize="lg" fontWeight={700}>
          <Typewriter
            options={{ loop: true }}
            onInit={(typewriter) => {
              typewriter
                .typeString(" Full Stack Developer 💻")
                .pauseFor(2500)
                .deleteAll()
                .typeString(" Digital Marketer 🥇")
                .start();
            }}
          />
        </Text>
      </Flex>
    </Stack>
  );
}
