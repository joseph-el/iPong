import React from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./iPongSignAuth.css";

import SignIn from "../../components/AuthComponents/SignIn/SignIn";
import CreateAccount from "../../components/AuthComponents/CreateAccount/CreateAccount";
import SignInOptions from "../../components/AuthComponents/SignInOptions/SignInOptions";
import WelcomeNewUser from "../../components/AuthComponents/WelcomeNewUser/WelcomeNewUser";
import WeSentCodeAndPassword from "../../components/AuthComponents/WeSentCodeAndPassword/WeSentCodeAndPassword";
import SetUserNameAndPicture from "../../components/AuthComponents/SetUserNameAndPicture/SetUserNameAndPicture";

export default function SignAuth(props) {
  const path = props.path;
  let componentToRender;

  switch (path) {
    case "/auth":
      componentToRender = <SignInOptions />;
      break;
    case "/auth/sign-in":
      componentToRender = <SignIn />;
      break;
    case "/auth/create-account":
      componentToRender = <CreateAccount />;
      break;
    case "/auth/set-username-picture":
      componentToRender = <SetUserNameAndPicture />;
      break;
    case "/auth/reset-password":
      componentToRender = (
        <WeSentCodeAndPassword
          title="Find your Account"
          guide_title="Enter the email associated with your account to change your password."
          input_type="Email"
          button_text="Next"
        />
      );
      break;
    case "/auth/new-password":
      componentToRender = (
        <WeSentCodeAndPassword
          title="Choose a new password"
          guide_title="Make sure it's 8 characters or more."
          input_type="New Password"
          button_text="Change password"
        />
      );
      break;
    case "/auth/welcome":
      componentToRender = <WelcomeNewUser button_text="Back to sign-in" />;
      break;
    case "/auth/verify-email":
      componentToRender = (
        <WeSentCodeAndPassword
          title="We sent you a code"
          guide_title="Enter it below to verify your email"
          input_type="verification code"
          button_text="Next"
        />
      );
      break;
    case "/auth/set-password":
      componentToRender = (
        <WeSentCodeAndPassword
          title="You'll need a password"
          guide_title="Make sure it's 8 characters or more."
          input_type="Password"
          button_text="Next"
        />
      );
      break;
    case "/auth/verify-reset-code":
      componentToRender = (
        <WeSentCodeAndPassword
          title="We sent you a code"
          guide_title="Check your email to get your confirmation code."
          input_type="verification code"
          button_text="Next"
        />
      );
      break;
 
  }

  return (
    <>
      <div className="SignAuth-page">
        <div className="render">
          {componentToRender}

        </div>
      </div>
    </>
  );
}
