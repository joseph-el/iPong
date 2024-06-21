import React, { useState, useEffect } from "react";
import "./TwoFactorAuthentication.css";
import { LoginHelp } from "../SignIn/SignIn";
import Close from "../../UI/Button/CloseButton/CloseButton";
import CustomButton from "../../UI/Button/SubmitButton/SubmitButton";
import { Input } from "@nextui-org/input";
import { UserGuide } from "../WeSentCodeAndPassword/WeSentCodeAndPassword";
import { Spacer } from "@nextui-org/react";
import api from "../../../api/posts";
import { useNavigate } from "react-router-dom";
export function TwoFactorAuthenticationLogin() {

const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [IsReadt, setIsReady] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const checkAuth = async () => {
      const tfa_token = document?.cookie
        ?.split("; ")
        ?.find((row) => row.startsWith("tfa_token="))
        ?.split("=")[1];
      try {

        console.log("code", code);
        console.log("tfa_token", tfa_token);
        const response = await api.post(`/auth/validate2fa`, {
          otp: code,
          tfaToken: tfa_token,
        });
        if (response.status === 201) {
          navigate("/ipong/home");
        }
      } catch (error) {
        setIsInvalid(true);
        setErrorMessage("Invalid Code");
      }
    };

    IsReadt && checkAuth();
  }, [IsReadt]);

  return (
    <div className="TwoFactorAuthenticationLogin-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto">
      <Close ClassName={"close-WeSentCodeAndPassword"} id="close" />

      <div className="WeSentCodeAndPassword">
        <div className="text-wrapper-3">{"Enter 2FA Password"}</div>

        <UserGuide
          guide_title={"To Login u need to enter 2FA Code on Your App"}
        />

        <div className="input-padding">
          <Input
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            onChange={(e) => {
              if (isInvalid) {
                setIsInvalid(false);
                setErrorMessage("");
              }

              const inputValue = e.target.value;
              const lastCharacter = inputValue.slice(-1);

              if (e.nativeEvent.inputType === "deleteContentBackward") {
                setCode(inputValue);
                return;
              }

              if (!/^\d$/.test(lastCharacter) || inputValue.length > 6) {
                return;
              }

              setCode(inputValue);
            }}
            value={code}
            placeholder="Enter the code"
            type="password"
          />
        </div>

        {/* <LoginHelp title={"Didn’t receive email?"} ClassName={"create-acc"} /> */}

        <Spacer y={48} />
        <div
          className="buttons-target"
          onClick={() => {
            if (code === "") {
              setIsInvalid(true);
              setErrorMessage("Code is required.");
              return;
            }
            if (code.length !== 6) {
              setIsInvalid(true);
              setErrorMessage("Code must be 6 characters long.");
              return;
            }
            setIsReady(true);
          }}
        >
          <CustomButton classNames="sign-in-competent-sign-in" text={"Login"} />
        </div>
      </div>
    </div>
  );
}
