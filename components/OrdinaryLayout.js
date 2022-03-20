import Header from "./Header/header";
import Footer from "./Footer/footer";
import { VStack, Box } from "@chakra-ui/react";

export default function OrdinaryLayout({ children }) {
  return (
    <Box
      display="grid"
      gridTemplateRows="auto 1fr auto"
      minH="100vh"
      overflow="hidden"
    >
      <Header />
      <VStack as="main">{children}</VStack>
      <Footer />
    </Box>
  );
}
