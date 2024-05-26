import React from "react";
import "./EditSecurity.css";
import { EditSecurityWrapper } from "./EditSecurityWrapper";
import {
  Avatar,
  Button,
  Input,
  cn,
  Accordion,
  AccordionItem,
  Textarea,
  Switch,
  ScrollShadow,
  Link,
} from "@nextui-org/react";
import { EyeFilledIcon } from "../../Input/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Input/EyeSlashFilledIcon";

const EditProfileNavbar = (props) => {
  return (
    <div className="EditProfileNavbar">
      <div className="overlap-group">
        <div className="text-wrapper">Security</div>

        <div className="push-button">
          <div
            className="EditProfileNavbar-button"
            onClick={props.closeEditSecurity}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

enum InputType {
  Current = 1,
  New = 2,
  Confirm = 3,
}

export default function EditSecurity(props) {
  const [isVisibleCurrent, setIsVisibleCurrent] = React.useState(false);
  const [isVisibleNew, setIsVisibleNew] = React.useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);

  const toggleVisibility = (inputType) => {
    console.log("inputType", inputType);
    switch (inputType) {
      case InputType.Current:
        setIsVisibleCurrent(!isVisibleCurrent);
        break;
      case InputType.New:
        setIsVisibleNew(!isVisibleNew);
        break;
      case InputType.Confirm:
        setIsVisibleConfirm(!isVisibleConfirm);
        break;
      default:
        break;
    }
  };

  const InputSecurity = (props) => {
    return (
      <Input
        size={"md"}
        value={props.placeholder}
        label={props.label}
        className={
          "input-edit-profile" +
          (props.label == "New Password:" ? " move-forgot-password" : "")
        }
        classNames={{
          description: "text-black60",
          label: "text-black50",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
        }}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => { toggleVisibility(props.varient)} }
          >
            {props.isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={props.isVisible ? "text" : "password"}
        description={
          props.label == "Current Password:" ? (
            <Link href="#" size="sm">
              forgot password?
            </Link>
          ) : (
            ""
          )
        }
        placeholder={props.placeholder}
      />
    );
  };

  return (
    <EditSecurityWrapper>
      <EditProfileNavbar closeEditSecurity={props.closeEditSecurity} />

      <div className="security-form">
        <InputSecurity
          isVisible={isVisibleCurrent}
          varient={InputType.Current}
          type="password"
          placeholder="Youssef El idrissi"
          label="Current Password:"
        />

        <InputSecurity
          isVisible={isVisibleNew}
          varient={InputType.New}
          type="password"
          placeholder="Youssef El idrissi"
          label="New Password:"
        />

        <InputSecurity
          isVisible={isVisibleConfirm}
          varient={InputType.Confirm}
          type="password"
          placeholder="Unraveling the mysteries of life,"
          label="Confirm Password:"
        />

        <div className="two-factor">
          <Accordion variant="splitted">
            <AccordionItem
              disableIndicatorAnimation
              isCompact
              className="rounded-mediums"
              aria-label="Accordion 1"
              title="Two-factor authentication"
              subtitle="Protect your account from unauthorized access by requiring a
                            second authentication method in addition to your Twitter password.
                            You can choose authentication app."
              onClick={props.setShowTwoFactorAuthentication}
            ></AccordionItem>
          </Accordion>
        </div>
      </div>
    </EditSecurityWrapper>
  );
}
