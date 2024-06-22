import React from "react";
import "./TwoFactorAuthenticationProfile.css";
import { TwoFactorAuthenticationProfileWrapper } from "./TwoFactorAuthenticationProfileWrapper";
import LeftIcon from "./lefticon.svg";
import { Link, Switch, cn, Input, Image } from "@nextui-org/react";
import QRtest from "./QrcodeTest.svg";
import CustomButton from "../../Button/SubmitButton/SubmitButton";
import Icon2FASuccess from "./2FA.svg";
import { useState, useEffect } from "react";
import api from "../../../../api/posts";
import { useSelector } from "react-redux";
import { RootState } from "../../../..//state/store";
import { set } from "lodash";

const TwoFactorAuthenticationProfileNavbar = (props) => {
  return (
    <div className="TwoFactorAuthenticationProfileNavbar">
      <div className="overlap-group">
        <div className="left-titile-icon" onClick={props.handelLeftTitle}>
          <img src={LeftIcon} alt="left icon" />
          <div className="text-wrappers">Left Title</div>
        </div>
        <div className="text-wrapper">Security</div>
      </div>
    </div>
  );
};

const TwoFactorAuthenticationProfileContent = ({ QrCode }) => {
  return (
    <div className="code-QR">
      <p className="text-wrapper">
        Scan the QR code to link the app to your account
      </p>
      <div className="flexcontainer">
        <p className="text">
          <span className="span">
            Open the app on your other mobile device, then scan the QR code with
            your device camera to get a code.
          </span>
        </p>

        <p className="text">
          <span className="span">
            If you don&#39;t have an authentication app on your other device,
            you&#39;ll need to install one now.
          </span>
        </p>
      </div>

      <img className="Qr-vector" alt="Vector" src={QrCode} />
    </div>
  );
};

export default function TwoFactorAuthenticationProfile(props) {
  const TfaEnabled = useSelector(
    (state: RootState) => state.userState?.tfaEnabled
  );

  const [isSelected, setIsSelected] = useState(false);
  const [AuthenticationisTurnedOn, setIsTurnedOn] = useState(TfaEnabled);

  const [GeneratedCode, setGeneratedCode] = useState(
    !TfaEnabled ? true : false
  );
  const UserEmail = useSelector((state: RootState) => state.userState.email);
  const [QrCode, setQrCode] = useState("");
  const [tfaToken, setTfaToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/auth/generate2fa/${UserEmail}`);

        setQrCode(response.data.qrCode);
        setTfaToken(response.data.tfaToken);
      } catch (error) {
        console.log("error tfa", error);
      }
      setGeneratedCode(false);
    };
    GeneratedCode && fetchData();
  }, [GeneratedCode]);

  const [isInvalid, setIsInvalid] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [IsReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("tfaToken", tfaToken);
        console.log("inputValue", inputValue);
        const response = await api.post(`/auth/validate2fa`, {
          otp: inputValue,
          tfaToken: tfaToken,
        });

        console.log("Submit:> ", response.data);

        // setIsTurnedOn(true);
        setIsSelected(false);
      } catch (error) {
        setIsInvalid(true);
        setErrorMessage("Invalid Code");

        console.log("error tfa", error);
      }
      setIsReadyToSubmit(false);
    };
    IsReadyToSubmit && fetchData();
  }, [IsReadyToSubmit]);

  const [GenerateCodeTime, setGenerateCodeTime] = useState(false);

  useEffect(() => {
    let timer;
    if (GenerateCodeTime) {
      timer = setTimeout(() => {
        setGenerateCodeTime(false);
        console.log("GenerateCodeTime", GenerateCodeTime);
        console.log("hello");
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [GenerateCodeTime]);

  const [DisableTfa, setDisableTfa] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(`/users/update`, {
          tfaEnabled: false,
        });
        console.log("EnableDisable:> ", response.data);
      } catch (error) {
        console.log("error tfa enable:> ", error);
      }
      setDisableTfa(false);
    };

    DisableTfa && fetchData();
  }, [DisableTfa]);

  return (
    <TwoFactorAuthenticationProfileWrapper>
      <TwoFactorAuthenticationProfileNavbar
        handelLeftTitle={props.handelLeftTitle}
      />

      <div className="Authentication-header">
        <Switch
          isSelected={isSelected}
          onValueChange={() => {
            if (AuthenticationisTurnedOn)
              setDisableTfa(true);

            setIsSelected(!isSelected);
          }}
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-lg bg-content1 hover:bg-content2 items-center",
              "justify-between cursor-pointer  gap-2 p-4"
            ),
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Authentication</p>
          </div>
        </Switch>
      </div>

      {isSelected ? (
        <div className="Authentication-on">
          <TwoFactorAuthenticationProfileContent QrCode={QrCode} />

          <div className="Authentication-submit">
            <Link
              isDisabled={GenerateCodeTime}
              href="#"
              size="sm"
              onClick={() => {
                setGenerateCodeTime(true);
                setGeneratedCode(true);
              }}
            >
              can’t scan the QR code?
            </Link>

            <Input
              errorMessage={ErrorMessage}
              onChange={(e) => {
                if (isInvalid) {
                  setIsInvalid(false);
                  setErrorMessage("");
                }

                const inputValue = e.target.value;
                const lastCharacter = inputValue.slice(-1);

                if (e.nativeEvent.inputType === "deleteContentBackward") {
                  setInputValue(inputValue);
                  return;
                }

                if (!/^\d$/.test(lastCharacter) || inputValue.length > 6) {
                  return;
                }

                setInputValue(inputValue);
              }}
              value={inputValue}
              type="code"
              label="Verification Code"
              placeholder="Enter Code"
              className="max-w-xsk"
            />
            <CustomButton
              classNames="sign-in-competent-sign-in"
              text="Next"
              onClick={() => {
                setIsReadyToSubmit(true);
              }}
            />
          </div>
        </div>
      ) : null}

      {AuthenticationisTurnedOn ? (
        <div className="Authentication-aleardy-setups">
          <Image
            shadow="none"
            radius="none"
            width="100%"
            alt={"2FA"}
            className="w-full object-cover fa-width h-[180px]"
            src={Icon2FASuccess}
          />
          <div className="Authentication-aleardy-setup-text">
            Two Factor Authentication is{" "}
            <span className="already">already setup</span>
          </div>
        </div>
      ) : null}
    </TwoFactorAuthenticationProfileWrapper>
  );
}
