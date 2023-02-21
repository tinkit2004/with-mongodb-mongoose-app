import Header from "./Header/header";
import Footer from "./Footer/footer";
import { VStack } from "@chakra-ui/react";
import Head from "next/head";
export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        {/* Add default color mode */}
        <title>{title}</title>
        <meta name="color-scheme" content="light" />
      </Head>
      <Header />
      <VStack as="main">{children}</VStack>
      <Footer />
    </>
  );
}
