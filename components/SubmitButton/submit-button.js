import React from "react";
import { Button } from "@chakra-ui/react";
export default function SubmitButton({
  children,

  ...otherProps
}) {
  return (
    <Button
      type="submit"
      //loadingText="Submitting"
      size="lg"
      bg={"blue.400"}
      color={"white"}
      _hover={{
        bg: "blue.500",
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
}
