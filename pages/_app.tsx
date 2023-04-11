import "../css/style.css";
import "../css/form.css";
import React from "react";
//Next-auth setup
import { SessionProvider } from "next-auth/react";
//Chakra UI setup
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
//Web3.0 setup
// import { Provider as WalletProvider, chain, defaultChains } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { WalletLinkConnector } from "wagmi/connectors/walletLink";
//fontawesome setup
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
//framer-motion setup
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}
//redux setup
import { store } from "../redux/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

//Setup sign-in-with-ethereum
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
});
// // API key for Ethereum node
// // Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
// const infuraId = process.env.INFURA_ID;

// // Chains for connectors to support
// const chains = defaultChains;

// // Set up connectors
// const connectors = ({ chainId }) => {
//   const rpcUrl =
//     chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
//     chain.mainnet.rpcUrls[0];
//   return [
//     new InjectedConnector({
//       chains,
//       options: { shimDisconnect: true },
//     }),
//     new WalletConnectConnector({
//       options: {
//         infuraId,
//         qrcode: true,
//       },
//     }),
//     new WalletLinkConnector({
//       options: {
//         appName: "My wagmi app",
//         jsonRpcUrl: `${rpcUrl}/${infuraId}`,
//       },
//     }),
//   ];
// };

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <WagmiConfig client={client}>
          <SessionProvider session={session} refetchOnWindowFocus={true}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} key={router.route} />
            </ChakraProvider>
          </SessionProvider>
        </WagmiConfig>
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;
