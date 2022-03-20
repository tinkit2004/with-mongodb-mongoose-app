import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  Link,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import CustomButton from "../CustomButton/CustomButton";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAccount } from "wagmi";

const Header = () => {
  const { data: session } = useSession();
  const [{ data: accountData }, disconnect] = useAccount();
  const [linearGradient] = useToken("bgGradient", ["linearGradient"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      h="10vh"
      padding={10}
      bg="white"
      color="black"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Andy's Blog
        </Heading>
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
            textAlign="center"
            display={{ base: "block", sm: "block", md: "flex" }}
          >
            Home
          </Link>
        </NextLink>
        <NextLink href="/blog" passHref>
          <Link
            textAlign="center"
            display={{ base: "block", sm: "block", md: "flex" }}
          >
            Blog
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
              fontSize={"sm"}
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
              fontSize={"sm"}
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
            <Button
              fontSize={"sm"}
              fontWeight={{ base: isOpen ? 600 : "none", md: 400 }}
              border={{ base: isOpen ? "2px" : "none", md: "none" }}
              borderColor="black.500"
              variant="link"
              onClick={() => signIn()}
              padding={{ base: isOpen ? "2" : "0", md: "0" }}
            >
              Sign In
            </Button>
          )}

          <CustomButton
            as="a"
            href="/auth/signup"
            buttonHoverColor={linearGradient}
            buttonHoverBrightness="95%"
            textHoverColor="white"
            bg={linearGradient}
          >
            Create account
          </CustomButton>
        </Stack>
      </Box>
    </Flex>
  );
};
export default Header;

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
// export default function Header() {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";

//   return (
//     <header>
//       <noscript>
//         <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
//       </noscript>
//       <div className={styles.signedInStatus}>
//         <p
//           className={`nojs-show ${
//             !session && loading ? styles.loading : styles.loaded
//           }`}
//         >
//           {!session && (
//             <>
//               <span className={styles.notSignedInText}>
//                 You are not signed in
//               </span>
//               <a
//                 href={`/api/auth/signin`}
//                 className={styles.buttonPrimary}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   signIn();
//                 }}
//               >
//                 Sign in
//               </a>
//             </>
//           )}
//           {session && (
//             <>
//               {session.user.image && (
//                 <span
//                   style={{ backgroundImage: `url('${session.user.image}')` }}
//                   className={styles.avatar}
//                 />
//               )}
//               <span className={styles.signedInText}>
//                 <small>Signed in as</small>
//                 <br />
//                 <strong>{session.user.email || session.user.name}</strong>
//               </span>
//               <a
//                 href={`/api/auth/signout`}
//                 className={styles.button}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   signOut();
//                 }}
//               >
//                 Sign out
//               </a>
//             </>
//           )}
//         </p>
//       </div>
//       <nav>
//         <ul className={styles.navItems}>
//           <li className={styles.navItem}>
//             <Link href="/">
//               <a>Home</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/client">
//               <a>Client</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/server">
//               <a>Server</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/protected">
//               <a>Protected</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/api-example">
//               <a>API</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/middleware-protected">
//               <a>Middleware protected</a>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }
