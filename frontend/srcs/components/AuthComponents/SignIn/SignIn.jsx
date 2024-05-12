import React from 'react'
import './SignIn.css'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import InputComponet from '../../UI/Input/Input'
import MaskGroup from  '../assets/maskgroup.svg'
import Close from '../../UI/Button/CloseButton/CloseButton'
import { Link } from 'react-router-dom'

export const Label = () => {
    return (
        <div className="label">
            <div className="text-wrapper">Sign in to iPong</div>
        </div>
    );
};

export const LoginHelp = ({title, ClassName}) => {
    return (
        <div className={ClassName}>
            <div className="left-title-help">{title}</div>
        </div>
    );
};

export default function SignIn() {

    return (
        <>

            <div className="sign-in-competent max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                
                <div className="maskgroup-svg">
                    <img src={MaskGroup} alt="Mask Group SVG" />
                </div>

                <Close ClassName={"close"}/>
                
                <Label />
                
                <div className="move-left">
                    <InputComponet type={"Email"} />
                    <InputComponet type={"pass"}  />
                </div>

                <LoginHelp title={"Forgot password?"} ClassName={"reset-pass"} />
                <LoginHelp title={"Create Account?"} ClassName={"create-acc"} />

                <div className='buttons-target' >

                    <CustomButton
                        classNames="sign-in-competent-sign-in"
                        text="Log in"
                    />

                </div>
            </div>
        </>
    );
}




