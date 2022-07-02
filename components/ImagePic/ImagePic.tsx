import React from "react";
import { Box, Image } from "@chakra-ui/react";

export default function ImagePic({
  imagePic,
  ...otherProps
}: {
  imagePic: string;
}) {
  return (
    <Box flexShrink="0" {...otherProps}>
      <Image src={imagePic} objectFit="cover" alt="" maxW="100%"></Image>
    </Box>
  );
}
