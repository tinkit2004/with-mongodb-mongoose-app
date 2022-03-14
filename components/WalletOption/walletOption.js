import React from "react";
import { useState } from "react";
import { useConnect, useAccount, useNetwork } from "wagmi";
import { useRouter } from "next/router";
import { SiweMessage } from "siwe";
import { Flex, Button, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
export default function WalletOption() {
  const [state, setState] = useState({});
  const [{ data, error }, connect] = useConnect();
  const router = useRouter();
  const signInwithWallet = async (connector) => {
    try {
      const res = await connect(connector);
      setState((x) => ({ ...x, error: undefined, loading: true })); // connect from useConnect
      if (!res.data) throw res.error ?? new Error("Something went wrong");

      const nonceRes = await fetch("/api/nonce");
      const message = new SiweMessage({
        domain: window.location.host,
        address: res.data.account,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: res.data.chain?.id,
        nonce: await nonceRes.text(),
      });
      const address = res.data.account;

      const signer = await connector.getSigner();
      const signature = await signer.signMessage(message.prepareMessage());

      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");
      if (verifyRes.ok) {
        router.push("/");
        setState((x) => ({ ...x, address, loading: false }));
      }

      // It worked! User is signed in with Ethereum
    } catch (error) {
      setState((x) => ({ ...x, error, loading: false }));
      console.log(error);
      // Do something with the error
    }
  };
  return (
    <Flex flexDirection="column">
      {data.connectors.map((connector) => (
        <Button
          mt={5}
          size="lg"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => signInwithWallet(connector)}
        >
          <Box mx={2}>
            <Image
              src={`/${connector.id}.svg`}
              alt={connector.name}
              height={32}
              width={32}
            />
          </Box>
          {connector.name}
          {!connector.ready && " (unsupported)"}
        </Button>
      ))}

      {error && (
        <Text color="red">{error?.message ?? "Failed to connect"}</Text>
      )}
    </Flex>
  );
}
