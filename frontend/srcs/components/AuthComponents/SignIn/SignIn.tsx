import React, { useEffect } from 'react'
import './SignIn.css'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import InputComponet from '../../UI/Input/Input'
import MaskGroup from  '../assets/maskgroup.svg'
import Close from '../../UI/Button/CloseButton/CloseButton'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import InputState from '../../../state/InputComponent/inputSlice'
import {
  setColor,
  setIsInvalid,
  setErrorMessage,
  setValue,
} from "../../../state/InputComponent/inputSlice";
import { useNavigate } from "react-router-dom";
import api from '../../../api/posts'
import { LoginState } from '../LoginState/LoginState'


export const Label = () => {
    return (
        <div className="label">
            <div className="text-wrapper">Sign in to iPong</div>
        </div>
    );
};

export const LoginHelp = ({title, ClassName}) => {
    return (
        <div className={ClassName} >
            <div className="left-title-help">{title}</div>
        </div>
    );
};


export default function SignIn() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const email    = useSelector((state: RootState) => state.input["email_input"]?.value);
    const password = useSelector((state: RootState) => state.input["password_input"]?.value);

  
    const handelonSubmit = () => {

        var state: LoginState = LoginState.UNK;
        
        // useEffect(() => {   
        //     const fetchPosts = async () => {
        //         try {
        //             const response = await api.get('/posts');
        //             //setPosts(response.data);
        //         }catch (error) {    
        //             console.log("Error: ", error);
        //         }
        //         this.props.h
        //     };
        //     fetchPosts();
        // }, []);

        state = StateOfLogin.INVALID_EMAIL;
        switch(state) {
            case StateOfLogin.INVALID_EMAIL:
                dispatch(setIsInvalid({ id: "email_input", isInvalid: true }));
                dispatch(setErrorMessage({ id: "email_input", errorMessage: "Invalid email" }));
                break;
            case StateOfLogin.INVALID_PASSWORD:
                dispatch(setIsInvalid({ id: "password_input", isInvalid: true }));
                dispatch(setErrorMessage({ id: "password_input", errorMessage: "Invalid password" }));
                break;
            case StateOfLogin.LOGIN_SUCCESS:
                navigate("/Home");
                break;
            default:
                break;
        }
    }

    const handleForgotPasswordClick = () => {
        console.log("Forgot password clicked");
        navigate("/Login/find-your-account");
    };

    const handleCreateAccountClick = () => {
        console.log("Create Account clicked");
        navigate("/Login/creat-account");
    };

    return (
        <>
            <div className="sign-in-competent max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <div className="maskgroup-svg">
                    <img src={MaskGroup} alt="Mask Group SVG" />
                </div>

                <Close ClassName={"close"}/>
                
                <Label />
                
                <div className="move-left">
                    <InputComponet type={"Email"} placeholder="Enter your email address" id="email_input"  />
                    <InputComponet type={"pass"}  placeholder="Enter your email password" id="password_input" />
                </div>

                <div onClick={handleForgotPasswordClick}>
                    <LoginHelp title={"Forgot password?"} ClassName={"reset-pass"}  />
                </div>

                <div onClick={handleCreateAccountClick} >
                    <LoginHelp title={"Create Account?"} ClassName={"create-acc"}/>
                </div>

                <div className='buttons-target' onClick={handelonSubmit}>
                    <CustomButton
                        classNames="sign-in-competent-sign-in"
                        text="Log in"
                    />
                </div>

            </div>
        </>
    );
}




