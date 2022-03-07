import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import AccessDenied from "../components/AccessDenied/access-denied";
import { Box } from "@chakra-ui/react";
export default function Page() {
  const { data: session, status } = useSession();
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
  if (!session) {
    return (
      <Layout>
        <Box
          h="55vh"
          margin="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <AccessDenied />
        </Box>
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout>
      <Box
        h="55vh"
        margin="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Protected Page</h1>
        <p>
          <strong>{content || "\u00a0"}</strong>
        </p>
      </Box>
    </Layout>
  );
}
