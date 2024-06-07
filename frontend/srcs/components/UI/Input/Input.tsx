import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./input.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";

import {
  setIsInvalid,
  setErrorMessage,
  setValue,
} from "../../../state/InputComponents/inputSlice";

export default function InputComponent(props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const color = useSelector((state: RootState) => state.input[props.id]?.color);
  const isInvalid = useSelector(
    (state: RootState) => state.input[props.id]?.isInvalid
  );
  const errorMessage = useSelector(
    (state: RootState) => state.input[props.id]?.errorMessage
  );
  const value = useSelector((state: RootState) => state.input[props.id]?.value);

  const input_id = props.id;
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    if (isInvalid && errorMessage) {
      dispatch(setIsInvalid({ id: input_id, isInvalid: false }));
      dispatch(setValue({ id: input_id, value: "" }));
      dispatch(setErrorMessage({ id: input_id, errorMessage: "" }));
    }
    const inputValue = event.target.value;
    dispatch(setValue({ id: input_id, value: inputValue }));
  };

  return (
    <Input
      color={color}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      onChange={handleInputChange}
      label={
        props.type === "fill" || props.type === "fill-pass" ? props.target : ""
      }
      variant="bordered"
      placeholder={props.placeholder}
      className="max-w-xs"
      value={value}
      endContent={
        props.type === "pass" || props.type === "fill-pass" ? (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        ) : null
      }
      classNames={{
        label: "text-black/50",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-xl",
          "bg-default-200/50",
          "backdrop-blur-xl",
          "input-border",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
        ],
      }}
      type={
        (props.type != "pass" && props.type != "fill-pass") ||
        (isVisible && (props.type === "pass" || props.type === "fill-pass"))
          ? "text"
          : "password"
      }
    />
  );
}

