import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeView } from "../../redux/viewReducer";
import {
  Radio,
  RadioGroup,
  Box,
  VStack,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import styles from "./styles.module.css";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const router = useRouter();

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box w="100%" as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        marginTop={"2%"}
        marginBottom={"2%"}
        textAlign={"center"}
        _checked={{
          bg: "lightgray",
          borderRightWidth: "3px",
          borderRightColor: "orange",
        }}
        _focus={{
          borderRight: "2px solid orange.600",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const options = ["Questions", "Tags", "Users"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "view",
    defaultValue: "Questions",
    onChange: (view) => {
      dispatch(changeView(view));
    },
  });

  const group = getRootProps();

  return (
    <VStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </VStack>
  );
};

export default Sidebar;
