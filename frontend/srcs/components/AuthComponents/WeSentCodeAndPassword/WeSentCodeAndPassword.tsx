import React from 'react'
import './WeSentCodeAndPassword.css'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import InputComponent from '../../UI/Input/Input'
import Close from '../../UI/Button/CloseButton/CloseButton'
import { LoginHelp } from '../SignIn/SignIn'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import validatePassword from "../../../utils/passwordValidation";
import {
    setIsInvalid,
    setErrorMessage,
  } from "../../../state/InputComponents/inputSlice";

export const UserGuide = ( {guide_title} ) => {
    return (
      <div className="user-name-alert">
        <p className="this-will-not-be-user">
            {guide_title}
        </p>
      </div>
    );
};

export default function WeSentCodeAndPassword(props) {
    const dispatch = useDispatch<AppDispatch>();
    

    const handelonSubmit = () => {
        const user_password    = useSelector((state: RootState) => state.input["set-user-password"]?.value);
    
        if (props.title === "We sent you a code") {
            if (!validatePassword(user_password)) {
                dispatch(setIsInvalid({ id: "set-user-passwordt", isInvalid: true }));
                dispatch(setErrorMessage({ id: "set-user-password", errorMessage: "hello" }));
            }
        }

    }


    const PaddingStyle = {
        paddingTop: props.title === "We sent you a code" ? "170px" : "221px",
        paddingRight: "0px",
        paddingBottom: "30px",
        paddingLeft: "42px"
    };
            
    return (
        <div className="WeSentCodeAndPassword-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
            <Close ClassName={"close-WeSentCodeAndPassword"}/>
            <div className='WeSentCodeAndPassword'>

                <div className="text-wrapper-3">{props.title}</div>

                <UserGuide guide_title={props.guide_title}/>

                <div className="input-padding">
                    <InputComponent type={"fill"} target={props.input_type} id={props.title === "We sent you a code" ? "set-user-password" : ""} />
                </div>
                {
                    (props.title === "We sent you a code") ? <LoginHelp title={"Didn’t receive email?"} ClassName={"create-acc"} /> : null
                }
                <div className="buttons-target" style={PaddingStyle} onClick={handelonSubmit} >
                    <CustomButton classNames="create-account" text={props.button_text} />
                </div>
            </div>
        </div>

    );

};