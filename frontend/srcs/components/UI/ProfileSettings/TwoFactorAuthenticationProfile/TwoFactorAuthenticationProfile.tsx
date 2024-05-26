import React from "react";
import "./TwoFactorAuthenticationProfile.css";
import { TwoFactorAuthenticationProfileWrapper } from "./TwoFactorAuthenticationProfileWrapper";
import LeftIcon from "./lefticon.svg";
import { Link, Switch, cn, Input, Image } from "@nextui-org/react";
import QRtest from "./QrcodeTest.svg";
import CustomButton from "../../Button/SubmitButton/SubmitButton";
import Icon2FASuccess from './2FA.svg'

const TwoFactorAuthenticationProfileNavbar = (props) => {
  return (
    <div className="TwoFactorAuthenticationProfileNavbar">
      <div className="overlap-group">
        <div className="left-titile-icon" onClick={props.handelLeftTitle}>
          <img src={LeftIcon} alt="left icon" />
          <div className="text-wrappers">Left Title</div>
        </div>
        <div className="text-wrapper">Security</div>

        {/* <div className="push-button">
        </div> */}
      </div>
    </div>
  );
};

const TwoFactorAuthenticationProfileContent = () => {
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

      <img className="Qr-vector" alt="Vector" src={QRtest} />
    </div>
  );
};

export default function TwoFactorAuthenticationProfile(props) {
  const [isSelected, setIsSelected] = React.useState(false);
  const [AuthenticationisTurnedOn, setIsTurnedOn] = React.useState(false);

  return (
    <TwoFactorAuthenticationProfileWrapper>
      <TwoFactorAuthenticationProfileNavbar handelLeftTitle={props.handelLeftTitle} />

      <div className="Authentication-header">
        <Switch
          isSelected={isSelected || AuthenticationisTurnedOn}
          onValueChange={setIsSelected || setIsTurnedOn}
          isDisabled={isSelected ? true : false}
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
          <TwoFactorAuthenticationProfileContent />

          <div className="Authentication-submit">
            <Link href="#" size="sm">
              can’t scan the QR code?
            </Link>

            <Input
              type="code"
              label="Verification Code"
              placeholder="Enter Code"
              className="max-w-xs"
            />
            <CustomButton classNames="sign-in-competent-sign-in" text="Next" onClick={
                () => { setIsTurnedOn(true) ; setIsSelected(false)}
            } />
          </div>
        </div>
      ) : null}


      {
        AuthenticationisTurnedOn ?
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
                        Two Factor Authentication is <span className="already">already setup</span>
                </div>
        </div> : null
      }


    </TwoFactorAuthenticationProfileWrapper>
  );
}
