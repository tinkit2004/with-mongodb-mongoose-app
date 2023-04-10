import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {
  Box,
  Stack,
  Flex,
  Button,
  Link,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import CustomButton from "../CustomButton/CustomButton";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAccount } from "wagmi";
import { Image } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeaderHeight } from "../../features/header/headerSlice";

const Header = () => {
  const { data: session } = useSession();
  const [{ data: accountData }, disconnect] = useAccount();
  const [linearGradient] = useToken("bgGradient", ["linearGradient"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const headerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (headerRef.current) {
      dispatch(setHeaderHeight(headerRef.current.clientHeight));
    }
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={10}
      bg="white"
      color="black"
      my={4}
      minH={"100px"}
      ref={headerRef}
    >
      <Flex align="center" mr={5} flexShrink={0}>
        {/* <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Andy's Blog
        </Heading> */}
        <NextLink href="/">
          <Image
            src="/Andy_tech_blog_logo.png"
            fit="cover"
            w={["200px", "150px"]}
            alt="Anyd's tech blog"
          />
        </NextLink>
      </Flex>
      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <NextLink href="/" passHref>
          <Link
            fontSize="2xs"
            textAlign="center"
            display={{ base: "block", sm: "block", md: "flex" }}
          >
            Home
          </Link>
        </NextLink>
        <NextLink href="/blog" passHref>
          <Link
            fontSize="2xs"
            textAlign="center"
            display={{ base: "block", sm: "block", md: "flex" }}
          >
            Blog
          </Link>
        </NextLink>
        <NextLink href="/Wordle" passHref>
          <Link
            textAlign="center"
            display={{ base: "block", sm: "block", md: "flex" }}
          >
            Wordle
          </Link>
        </NextLink>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
        w={{ base: isOpen ? "100%" : "0", md: "auto" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 3, md: 6 }}
          justify="center"
        >
          {session ? (
            <Button
              fontSize="2xs"
              fontWeight={{ base: isOpen ? 600 : "none", md: 400 }}
              border={{ base: isOpen ? "2px" : "none", md: "none" }}
              borderColor="black.500"
              variant="link"
              onClick={() => signOut()}
              padding={{ base: isOpen ? "2" : "0", md: "0" }}
            >
              Sign out
            </Button>
          ) : accountData ? (
            <Button
              fontSize="2xs"
              fontWeight={{ base: isOpen ? 600 : "none", md: 400 }}
              border={{ base: isOpen ? "2px" : "none", md: "none" }}
              borderColor="black.500"
              variant="link"
              onClick={disconnect}
              padding={{ base: isOpen ? "2" : "0", md: "0" }}
            >
              Sign out
            </Button>
          ) : (
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 3, md: 6 }}
              justify="center"
            >
              <Button
                fontSize="2xs"
                fontWeight={{ base: isOpen ? 600 : "none", md: 400 }}
                border={{ base: isOpen ? "2px" : "none", md: "none" }}
                borderColor="black.500"
                variant="link"
                onClick={() => signIn()}
                padding={{ base: isOpen ? "2" : "0", md: "0" }}
              >
                Sign In
              </Button>
              <CustomButton
                fontSize="2xs"
                as="a"
                href="/auth/signin?authtypecheck=register"
                buttonHoverColor={linearGradient}
                buttonHoverBrightness="95%"
                textHoverColor="white"
                textHoverGradientColor=""
                bg={linearGradient}
              >
                Create account
              </CustomButton>
            </Stack>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};
export default Header;
