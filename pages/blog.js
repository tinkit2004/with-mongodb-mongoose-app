import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import OrdinaryLayout from "../components/OrdinaryLayout";
import AccessDenied from "../components/AccessDenied/access-denied";
import { Box, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
export default function Page() {
  const { data: session, status } = useSession();
  const [{ data: accountData }] = useAccount();
  const loading = status === "loading";
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blog");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session && !accountData) {
    return (
      <OrdinaryLayout>
        <Box
          margin="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <AccessDenied />
        </Box>
      </OrdinaryLayout>
    );
  }

  // If session exists, display content
  return (
    <OrdinaryLayout>
      <Box
        margin="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="h1" fontSize="xl">
          Protected Page
        </Text>
        <Text>You are now signed in using </Text>
        {accountData && <p>{accountData.address}</p>}
        <p>
          <strong>{content || "\u00a0"}</strong>
        </p>
      </Box>
    </OrdinaryLayout>
  );
}
