import React from "react";
import Title from "../Title/title";
import {
  Box,
  Stack,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import ImagePic from "../ImagePic/ImagePic";
import { motion } from "framer-motion";
import { md } from "../../theme";
import {
  topVariant,
  rightFadeInVariant,
  leftFadeInVariant,
} from "../../animation/animation";

export default function Project({ projectDatas }) {
  const MotionGrid = motion(Grid);
  const MotionGridItem = motion(GridItem);
  const [isLargerThanMd] = useMediaQuery(md);

  return (
    <>
      <Box h="100%" px={[5, 20, 30, 60]} mb={8}>
        <Title
          variants={topVariant}
          mt={[4, 4, 0]}
          initial="hidden"
          whileInView="visible"
        >
          Projects
        </Title>
        {projectDatas.map((projectData) => {
          const { _id, projectTitle, projectDescription, projectImageUrl } =
            projectData;
          return (
            <MotionGrid
              key={_id}
              templateColumns="repeat(12, 1fr)"
              variants={topVariant}
              initial="hidden"
              whileInView="visible"
              mb={[16, 24]}
            >
              <MotionGridItem
                colSpan={[12, 12, 4]}
                variants={isLargerThanMd ? rightFadeInVariant : topVariant}
                mb={4}
                mr={[0, 10]}
              >
                <Stack align={["center", "center", "start"]}>
                  <Text as="h3" fontSize={["xl", "2xl"]} fontWeight="500">
                    {projectTitle || ""}
                  </Text>
                  <Text align={["center", "center", "start"]}>
                    {projectDescription || ""}
                  </Text>
                </Stack>
              </MotionGridItem>
              <MotionGridItem
                colSpan={[12, 12, 8]}
                variants={isLargerThanMd ? leftFadeInVariant : topVariant}
              >
                <Box w="100%" align="center">
                  <ImagePic imagePic={projectImageUrl || ""} maxW="100%" />
                </Box>
              </MotionGridItem>
            </MotionGrid>
          );
        })}
      </Box>
    </>
  );
}
