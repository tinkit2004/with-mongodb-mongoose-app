import "../css/style.css";
import "../css/form.css";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import Head from "next/head";
import Link from "next/link";
import { ChakraProvider } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
  // <>
  //   <Head>
  //     <title>Pet Care App</title>
  //   </Head>

  //   <div className="top-bar">
  //     <div className="nav">
  //       <Link href="/">
  //         <a>Home</a>
  //       </Link>
  //       <Link href="/new">
  //         <a>Add Pet</a>
  //       </Link>
  //     </div>

  //     <img
  //       id="title"
  //       src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
  //       alt="pet care logo"
  //     ></img>
  //   </div>
  //   <div className="grid wrapper">
  //     <ChakraProvider>
  //       <Component {...pageProps} />
  //     </ChakraProvider>
  //   </div>
  // </>
}

export default MyApp;
