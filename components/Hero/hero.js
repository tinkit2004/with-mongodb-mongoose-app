import React from "react";
import { Text, Stack, Flex } from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import { useToken } from "@chakra-ui/react";
export default function Hero() {
  const [linearGradient] = useToken("bgGradient", ["linearGradient"]);
  return (
    <Stack align="center" h="90vh" justify="center">
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
