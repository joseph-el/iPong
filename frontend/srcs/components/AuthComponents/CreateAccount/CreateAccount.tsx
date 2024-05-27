import React from "react";
import "./CreateAccount.css";
import InputComponent from "../../UI/Input/Input";
import CustomCheckbox from "../../UI/Checkbox/Checkbox";
import Close from "../../UI/Button/CloseButton/CloseButton";
import CustomButton from "../../UI/Button/SubmitButton/SubmitButton";
import CustomDateInput from "../../UI/Input/DateInput/CustomDateInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  setIsInvalid,
  setErrorMessage,
} from "../../../state/InputComponents/inputSlice";
import {
  setDateIsInvalid,
  setDateErrorMessage,
} from "../../../state/InputComponents/InputDateComponent/dateSlice";

import { setGenderInvalide } from "../../../state/Checkbox/CheckboxSlice";

import { useNavigate } from "react-router-dom";
import {
  isFullNameValid,
  validateEmail,
  isDateOfBirthValid,
} from "../../../utils/formValidation";
import { GenderType } from "../../../state/Checkbox/CheckboxSlice";

export const DateOfBirth = () => {
  return (
    <div className="date-of-birth">
      <p className="this-will-not-be">
        This will not be shown publicly. Confirm your own age, a pet, or
        something else.
      </p>
      <div className="text-wrapper">Date of birth</div>
    </div>
  );
};

export default function CreateAccount() {
  const fullname = useSelector(
    (state: RootState) => state.input["create-account-full-name"]?.value
  );
  const email = useSelector(
    (state: RootState) => state.input["create-account-email"]?.value
  );
  const date_of_birth = useSelector((state: RootState) => state.date?.value);
  const UserGender = useSelector(
    (state: RootState) => state.gender?.UserGender
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async () => {
    const errors = await getValidationErrors();

    if (!errors) {
      navigate("/Login/need-a-password");
    } else handleErrors(errors);
  };

  const handelonClose = () => {
    // TDOD: Close the sign in component and navigate to the sign up component
    // Clear the input fields state and error messages
    navigate("/login");
    console.log("Close");
  };

  const getValidationErrors = async () => {
    if (!fullname) {
      return { id: "create-account-full-name", message: "Fullname required!" };
    } else if (!isFullNameValid(fullname)) {
      return { id: "create-account-full-name", message: "Invalid name format" };
    }
    if (!email) {
      return { id: "create-account-email", message: "Email required!" };
    }
    const emailError = await validateEmail(email);
    if (typeof emailError === "string") {
      return { id: "create-account-email", message: emailError };
    }
    if (!date_of_birth) {
      return { id: "undefined", message: "Date of birth required!" };
    }
    const validationResult = isDateOfBirthValid(date_of_birth);
    if (validationResult !== null) {
      return { id: "undefined", message: validationResult };
    }
    if (UserGender == GenderType.UNK) {
      return { id: "undefined_gender", message: "User gender required!" };
    }
    return null;
  };

  const handleErrors = (error) => {
    const { id, message } = error;

    if (id === "undefined_gender") {
      dispatch(setGenderInvalide({ id, invalide: true }));
      return;
    }
    if (id === "undefined") {
      dispatch(setDateIsInvalid({ isInvalid: true }));
      dispatch(setDateErrorMessage(message));
    } else {
      console.log("id: ", id);
      console.log("message: ", message);
      dispatch(setIsInvalid({ id, isInvalid: true }));
      dispatch(setErrorMessage({ id, errorMessage: message }));
    }
  };

  return (
    <>
      <div className="CreateAccount-competent-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
        <Close ClassName={"creat-close"} id={"close"} func={handelonClose} />

        <div className="CreateAccount-competent">
          <div className="text-wrapper-3">Create an account</div>

          <InputComponent
            type={"fill"}
            target={"Full Name"}
            id="create-account-full-name"
            placeholder="Enter your full name"
          />
          <InputComponent
            type={"fill"}
            target={"Address Email"}
            id="create-account-email"
            placeholder="Enter your full email"
          />

          <DateOfBirth />

          <div className="date-of-birth-resize">
            <CustomDateInput />
          </div>

          <div className="gender">
            <div className="text-wrapper-4">Gender</div>
          </div>

          <div className="move-gender">
            <CustomCheckbox />
          </div>

          <div className="buttons-target" onClick={handleOnSubmit}>
            <CustomButton classNames="create-account" text="Next" />
          </div>
        </div>
      </div>
    </>
  );
}
