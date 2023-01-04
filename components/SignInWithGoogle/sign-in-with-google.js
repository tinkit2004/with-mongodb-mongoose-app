import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Icon } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
export default function SignInWithGoogle() {
  return (
    <Button
      leftIcon={<Icon as={FcGoogle} />}
      size="lg"
      onClick={() => signIn("google")}
      fontSize="sm"
    >
      Sign in with Google
    </Button>
  );
}
