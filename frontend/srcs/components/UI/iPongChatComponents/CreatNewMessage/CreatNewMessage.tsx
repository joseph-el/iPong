import React from "react";
import "./CreatNewMessage.css";
import { CreatNewMessageWrapper } from "./CreatNewMessageWrapper";

import CustomButton from "../../Button/SubmitButton/SubmitButton";
import {
  RadioGroup,
  Radio,
  useRadio,
  VisuallyHidden,
  RadioProps,
  cn,
  ScrollShadow,
} from "@nextui-org/react";

import { Tooltip, Button } from "@nextui-org/react";
import Close from "../../Button/CloseButton/CloseButton";

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "max-w-[350px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

export default function CreatNewMessage(props) {
  const [value, setValue] = React.useState("nothing");
  const [isValide, setIsValide] = React.useState(true);
  const handelOnclick = () => {
    if (value === "friend") {
      props.onClose();
      props.ShowCreateFriendChat();
    } else if (value === "group") {
      props.onClose();
      props.ShowCreateGroupChat();
    } else {
      setIsValide(false);
    }
  };

  return (
    <CreatNewMessageWrapper>
      <ScrollShadow className="h-[550px]" hideScrollBar>
        <div className="CreatNewMessage-frame">
          <div className="div-title">
            <div className="title">Create New Chat</div>
            <Close ClassName="closeicon" func={props.onCloseComponent} id="close" />
          </div>

          <div className="Select-Type">
            <RadioGroup>
              <CustomRadio
                isInvalid={isValide}
                description="Initiate a private chat with a friend"
                value="friend"
                onClick={() => {
                  setIsValide(true);
                  setValue("friend");
                }}
              >
                Start Friend Chat
              </CustomRadio>
              <CustomRadio
                description="Create a group chat with multiple friends"
                value="group"
                onClick={() => {
                  setIsValide(true);
                  setValue("group");
                }}
              >
                Create Group Chat
              </CustomRadio>
            </RadioGroup>
          </div>

          {isValide ? null : (
            <div className="Tooltip-required">
              <Tooltip color="danger" content="Need to select">
                <Button color="danger" variant="flat">
                  This field is required
                </Button>
              </Tooltip>
            </div>
          )}

          <div
            className="CreatNewMessage-next-button hover:animate-pulse"
            onClick={() => {}}
          >
            <CustomButton
              classNames="sign-in-competent-sign-in"
              text="Next"
              onClick={handelOnclick}
            />
          </div>
        </div>
      </ScrollShadow>
    </CreatNewMessageWrapper>
  );
}
