import React from "react";
import "./EditSecurity.css";
import { EditSecurityWrapper } from "./EditSecurityWrapper";
import { Input, Accordion, AccordionItem, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "../../Input/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Input/EyeSlashFilledIcon";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { getAvatarSrc } from "../../../../utils/getAvatarSrc";
import { getUserLevel } from "../../../../utils/getCurrentLevel";
import { set } from "lodash";
import { isValidURL } from "../../../../utils/isValidURL";
import { validateEmail } from "../../../../utils/formValidation";
import { isFullNameValid } from "../../../../utils/formValidation";
import validateUsername from "../../../../utils/usernameValidation";
import api from "../../../../api/posts";
import { useEffect } from "react";

import Close from "../../../UI/Button/CloseButton/CloseButton"
const EditProfileNavbar = (props) => {
  return (
    <div className="EditProfileNavbar">
      <div className="overlap-group">
        <Close id={"$"} func={props.closeEditSecurity} />
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
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);

  const UserInfo = useSelector((state: RootState) => state.userState);

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [ErrorMessageNewPassword, setErrorMessageNewPassword] = useState("");
  const [ErrorMessageCurrentPassword, setErrorMessageCurrentPassword] =
    useState("");
  const [ErrorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState("");

  const toggleVisibility = (inputType) => {
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

  const [inputPassword, setInputPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users/whoami");

        // TODO: set current password
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [IsReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/users/update/password", {
          password: inputPassword[InputType.New],
        });

        console.log(response.data);
      } catch (error) {
        setIsCurrentPasswordValid(false);
        setErrorMessageCurrentPassword("Password update failed");
        console.log(error);
      }
      setIsReadyToSubmit(false);
      props.closeEditSecurity();
    };

    IsReadyToSubmit && fetchData();
  }, [IsReadyToSubmit]);

  const handelSubmit = () => {
    console.log("handelSubmit");
    if (inputPassword[InputType.Current] == "") {
      setIsCurrentPasswordValid(true);
      setErrorMessageCurrentPassword("Please enter your current password");
      return;
    }

    if (inputPassword[InputType.New] == "") {
      setIsNewPasswordValid(true);
      setErrorMessageNewPassword("Please enter your new password");
      return;
    }

    if (inputPassword[InputType.Confirm] == "") {
      setIsConfirmPasswordValid(true);
      setErrorMessageConfirmPassword("Please confirm your new password");
      return;
    }

    if (inputPassword[InputType.Current] != currentPassword) {
      setIsCurrentPasswordValid(true);
      setErrorMessageCurrentPassword("Current password is incorrect");
      return;
    }

    if (inputPassword[InputType.New] != inputPassword[InputType.Confirm]) {
      setIsNewPasswordValid(true);
      setIsConfirmPasswordValid(true);
      setErrorMessageNewPassword("Passwords do not match");
      setErrorMessageConfirmPassword("Passwords do not match");
      return;
    }

    if (inputPassword[InputType.New].length < 8) {
      setIsNewPasswordValid(true);
      setErrorMessageNewPassword("Password must be at least 8 characters");
      return;
    }

    if (inputPassword[InputType.New].length > 20) {
      setIsNewPasswordValid(true);
      setErrorMessageNewPassword("Password must be less than 20 characters");
      return;
    }
    console.log("handelSubmit Done");
    setIsReadyToSubmit(true);
  };

  return (
    <EditSecurityWrapper>
      <EditProfileNavbar
        closeEditSecurity={() => {
          handelSubmit();
          // props.closeEditSecurity()
        }}
      />

      <div className="security-form">

        <Input
          isInvalid={isCurrentPasswordValid}
          errorMessage={ErrorMessageCurrentPassword}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return;
            }
            if (
              !isConfirmPasswordValid ||
              !isNewPasswordValid ||
              !isCurrentPasswordValid
            ) {
              setIsConfirmPasswordValid(false);
              setIsNewPasswordValid(false);
              setIsCurrentPasswordValid(false);

              setErrorMessageNewPassword("");
              setErrorMessageCurrentPassword("");
              setErrorMessageConfirmPassword("");
            }
            setInputPassword({
              ...inputPassword,
              [InputType.Current]: e.target.value,
            });
          }}
          isDisabled={UserInfo.intraId == ""}
          size={"md"}
          value={inputPassword[InputType.Current]}
          label={"Current Password:"}
          className={"input-edit-profile"}
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
              onClick={() => {
                toggleVisibility(InputType.Current);
              }}
            >
              {isVisibleCurrent ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleCurrent ? "text" : "password"}
          description={
            <Link isDisabled={true} href="#" size="sm">
              forgot password?
            </Link>
          }
          placeholder={"current password"}
        
        />

        <Input
        
          isInvalid={isNewPasswordValid}
          errorMessage={ErrorMessageNewPassword}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return;
            }
            if (
              !isConfirmPasswordValid ||
              !isNewPasswordValid ||
              !isCurrentPasswordValid
            ) {
              setIsConfirmPasswordValid(false);
              setIsNewPasswordValid(false);
              setIsCurrentPasswordValid(false);

              setErrorMessageNewPassword("");
              setErrorMessageCurrentPassword("");
              setErrorMessageConfirmPassword("");
            }
            setInputPassword({
              ...inputPassword,
              [InputType.New]: e.target.value,
            });
          }}
          isDisabled={UserInfo.intraId == ""}
          size={"md"}
          value={inputPassword[InputType.New]}
          label={"New Password:"}
          className={"input-edit-profile" + " move-forgot-password"}
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
              onClick={() => {
                toggleVisibility(InputType.New);
              }}
            >
              {props.isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleNew ? "text" : "password"}
          placeholder={"new password"}
        
        />

        <Input

          isInvalid={isConfirmPasswordValid}
          errorMessage={ErrorMessageConfirmPassword}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return;
            }
            if (
              !isConfirmPasswordValid ||
              !isNewPasswordValid ||
              !isCurrentPasswordValid
            ) {
              setIsConfirmPasswordValid(false);
              setIsNewPasswordValid(false);
              setIsCurrentPasswordValid(false);

              setErrorMessageNewPassword("");
              setErrorMessageCurrentPassword("");
              setErrorMessageConfirmPassword("");
            }
            setInputPassword({
              ...inputPassword,
              [InputType.Confirm]: e.target.value,
            });
          }}
          isDisabled={UserInfo.intraId == ""}
          size={"md"}
          value={inputPassword[InputType.Confirm]}
          label={"Confirm Password:"}
          className={"input-edit-profile"}
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
              onClick={() => {
                toggleVisibility(InputType.Confirm);
              }}
            >
              {props.isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleConfirm ? "text" : "password"}
          placeholder={"confirm password"}

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
              onClick={() => {
                props.setShowTwoFactorAuthentication();
                setInputPassword({
                  ...inputPassword,
                  [InputType.Current]: "",
                  [InputType.New]: "",
                  [InputType.Confirm]: "",
                });
              }}
            ></AccordionItem>
          </Accordion>
        </div>
      </div>
    </EditSecurityWrapper>
  );
}
