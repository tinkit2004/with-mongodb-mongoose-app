import {
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
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import FormControlField from "../../components/FormControlField/form-control-field";
import SubmitButton from "../../components/SubmitButton/submit-button";
import SignInWithGoogle from "../../components/SignInWithGoogle/sign-in-with-google";
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
export default function SignInCard() {
  const methods = useForm({ defaultValues: { email: "", password: "" } });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const { status } = useSession();
  const [{ data: accountData }] = useAccount();
  const router = useRouter();
  const [formError, setFormError] = useState("");
  if (status === "authenticated" || accountData) {
    router.push("/");
  }
  const [showPassword, setShowPassword] = useState(false);
  // const [signInInfo, setSignInInfo] = useState({
  //   email: "",
  //   password: "",
  // });
  // const { email, password } = signInInfo;

  //Code below are for native use of react controlled component
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setsignInInfo((prevSignInInfo) => {
  //     return {
  //       ...prevSignInInfo,
  //       [name]: value,
  //     };
  //   });
  //   //console.log(signUpInfo);
  // };
  const handleOnSubmit = async (data) => {
    const { email, password } = data;
    //console.log(data);
    setFormError("");
    const signInData = await signIn("Login", {
      redirect: false,
      email: email,
      password: password,
    });
    const { error, url } = signInData;
    console.log(error);
    setFormError(error);
    if (url != null) {
      router.push(url);
    }
    reset();
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
                Sign in
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
              <Flex flexDirection="column">
                <FormControlField
                  name="email"
                  fieldName="Email address"
                  type="email"
                  isRequired
                  // handleChange={handleChange}
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
                <Stack spacing={5}>
                  <SubmitButton>Sign In</SubmitButton>
                  <SignInWithGoogle />
                </Stack>
                <WalletOption />
                <Stack pt={6}>
                  <Text align={"center"}>
                    Not a user?{" "}
                    <NextLink href="/auth/signup" passHref>
                      <Link color={"blue.400"}>Sign Up</Link>
                    </NextLink>
                  </Text>
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Flex>
      </form>
    </FormProvider>
  );
}
// export async function getServerSideProps(context) {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }
