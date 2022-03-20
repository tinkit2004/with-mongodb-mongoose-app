import Header from "./Header/header";
import Footer from "./Footer/footer";
import { VStack } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <VStack as="main">{children}</VStack>
      <Footer />
    </>
  );
}
