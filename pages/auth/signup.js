import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import FormControlField from "../../components/FormControlField/form-control-field";
import SignInWithGoogle from "../../components/SignInWithGoogle/sign-in-with-google";
import SubmitButton from "../../components/SubmitButton/submit-button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
const WalletOption = dynamic(
  () => import("../../components/WalletOption/walletOption.js"),
  { ssr: false }
);
export default function SignUpCard() {
  const [{ data: accountData }] = useAccount();
  //Get the connected wallet info on page load like the address
  const [state, setState] = useState({});
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/me");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } finally {
        setState((x) => ({ ...x, loading: false }));
      }
    };
    // 1. page loads
    (async () => await handler())();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  const methods = useForm({
    defaultValues: { email: "", password: "", firstName: "", lastName: "" },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  if (status === "authenticated" || accountData) {
    router.push("/");
  }

  const handleOnSubmit = async (data, event) => {
    const { email, firstName, lastName, password } = data;
    setFormError("");
    try {
      const signUpData = await signIn("SignUp", {
        redirect: false,
        email: email,
        name: firstName,
        lastName: lastName,
        password: password,
      });
      const { error, status, ok, url } = signUpData;
      setFormError(error);
      if (url != null) {
        router.push(url);
      }
      reset();
    } catch (error) {
      console.log(error);
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
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack>
                <HStack>
                  <Box>
                    <FormControlField
                      name="firstName"
                      isRequired
                      fieldName="First Name"
                      type="text"
                      //handleChange={handleChange}
                      id="firstName"
                      validation={{ required: "Required" }}
                    />
                  </Box>
                  <Box>
                    <FormControlField
                      name="lastName"
                      fieldName="Last Name"
                      type="text"
                      //onChange={handleChange}
                      id="lastName"
                    />
                  </Box>
                </HStack>
                <FormControlField
                  name="email"
                  fieldName="Email address"
                  type="email"
                  isRequired
                  //onChange={handleChange}
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
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...register("password", {
                        required: "Required",
                        minLength: {
                          value: 8,
                          message: "Minimum length should be 8",
                        },
                      })}
                      //onChange={handleChange}
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
                <Stack spacing={5} pt={2} mb={0}>
                  <SubmitButton>Sign Up</SubmitButton>
                  <SignInWithGoogle />
                </Stack>
                <WalletOption />
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <NextLink href="/auth/signin" passHref>
                      <Link color={"blue.400"}>Login</Link>
                    </NextLink>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </FormProvider>
  );
}
