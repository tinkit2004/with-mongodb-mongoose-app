import {
  HStack,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthType,
  setAuthType,
} from "../../features/authType/authTypeSlice";
import { passwordRegex } from "../../lib/passwordRegex";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import FormControlField from "../../components/FormControlField/form-control-field";
import SubmitButton from "../../components/SubmitButton/submit-button";
import SignInWithGoogle from "../../components/SignInWithGoogle/sign-in-with-google";
import { useRouter } from "next/router";
import { useSession, signIn, getCsrfToken } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
//SIWE
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
//import dynamic from "next/dynamic";
// const WalletOption = dynamic(
//   () => import("../../components/WalletOption/walletOption.js"),
//   { ssr: false }
// );
export default function SignInCard() {
  const methods = useForm({ defaultValues: { email: "", password: "" } });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const authType = useSelector(selectAuthType);
  //const [authType, setAuthType] = useState("Login");
  const oppAuthType = {
    Login: "Register",
    Register: "Login",
  };
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);
  //const [{ data: accountData }] = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const router = useRouter();
  const { authtypecheck } = router.query;
  const [formError, setFormError] = useState("");
  if (status === "authenticated") {
    router.push("/");
  }
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);
  useEffect(() => {
    if (authtypecheck === "register") {
      dispatch(setAuthType("Register"));
    } else {
      dispatch(setAuthType("Login"));
    }
  }, [authtypecheck, dispatch]);
  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleWalletLogin();
    }
  }, [isConnected]);
  const registerUser = async (email, password, firstName, lastName) => {
    const abortController = new AbortController();
    setController(abortController);

    try {
      const res = await fetch("/api/signup", {
        signal: abortController.signal,
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          name: firstName,
          lastName: lastName,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      await loginUser(email, password);
    } catch (error) {
      if (error.name === "AbortError") {
        setFormError("Request aborted");
      } else {
        setFormError(error.message);
      }
    } finally {
      setLoading(false);
      setController(null);
    }
  };
  const loginUser = async (email, password) => {
    const signInData = await signIn("Login", {
      redirect: false,
      email: email,
      password: password,
    });
    const { error, url } = signInData;
    //console.log(error, url);
    setFormError(error);
    if (url != null) {
      router.push(url);
    }
  };
  const handleOnSubmit = async (data) => {
    //console.log(data);
    const { email, password, firstName, lastName } = data;
    setFormError("");
    {
      authType === "Register"
        ? registerUser(email, password, firstName, lastName)
        : loginUser(email, password);
    }
    reset();
  };
  //handleWalletLogin
  const handleWalletLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} minW={"36vw"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                {authType === "Login" ? "Sign In" : "Sign Up"}
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Flex flexDirection="column">
                {authType === "Register" && (
                  <HStack>
                    <Box>
                      <FormControlField
                        name="firstName"
                        isRequired
                        fieldName="First Name"
                        type="text"
                        id="firstName"
                        validation={{ required: "Required" }}
                      />
                    </Box>
                    <Box>
                      <FormControlField
                        name="lastName"
                        fieldName="Last Name"
                        type="text"
                        id="lastName"
                      />
                    </Box>
                  </HStack>
                )}
                <FormControlField
                  name="email"
                  fieldName="Email address"
                  type="email"
                  isRequired
                  id="email"
                  validation={{ required: "Required" }}
                />

                <FormControl
                  id="password"
                  isRequired
                  isInvalid={errors.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Required",
                        pattern: {
                          value: passwordRegex,
                          message:
                            "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character",
                        },
                      })}
                    />

                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                {formError && (
                  <Text fontSize="md" color="#f00">
                    {formError}
                  </Text>
                )}
                <Stack spacing={5}>
                  <SubmitButton
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    disabled={loading}
                  >
                    {authType === "Login" ? "Sign In" : "Sign Up"}
                  </SubmitButton>
                  <SignInWithGoogle />
                </Stack>
                <SubmitButton
                  onClick={(e) => {
                    e.preventDefault();
                    if (!isConnected) {
                      connect();
                    } else {
                      handleWalletLogin();
                    }
                  }}
                >
                  Sign in with Web3 Wallet
                </SubmitButton>
                {/* <WalletOption /> */}
                <Stack pt={6} direction={["column", "row"]} justify="center">
                  <Text align={"center"}>
                    {authType === "Login"
                      ? "Don't have an account? "
                      : "Have an account? "}
                  </Text>
                  <button
                    onClick={() => dispatch(setAuthType(oppAuthType[authType]))}
                  >
                    <Text as="u">{oppAuthType[authType]}</Text>
                  </button>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Flex>
      </form>
    </FormProvider>
  );
}
