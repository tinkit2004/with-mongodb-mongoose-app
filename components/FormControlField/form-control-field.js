import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ConnectForm } from "../connect-form";
import { useFormContext } from "react-hook-form";
const FormControlField = ({
  name,
  fieldName,
  type,
  validation,
  ...otherProps
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors[name]} {...otherProps}>
      <FormLabel>{fieldName}</FormLabel>
      <ConnectForm>
        {({ register }) => (
          <Input type={type} {...register(name, validation)} />
        )}
      </ConnectForm>
      <FormErrorMessage>
        {errors[name] && errors[name]["message"]}
      </FormErrorMessage>
    </FormControl>
  );
};
export default FormControlField;
// export default function FormControlField({
//   name,
//   fieldName,
//   type,
//   handleChange,
//   required,

//   ...otherProps
// }) {
//   return (
//     <FormControl {...otherProps}>
//       <FormLabel>{fieldName}</FormLabel>
//       <Input
//         type={type}

//         //onChange={handleChange}
//       />
//     </FormControl>
//   );
// }
// {
//   /* <FormControl id="firstName" isRequired>
//                   <FormLabel>First Name</FormLabel>
//                   <Input type="text" />
//                 </FormControl> */
// }
