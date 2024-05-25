
import React from 'react'
import './SignInOptions.css'
import GoogleLogo from "../assets/google_logo.svg"
import AppleLogo from "../assets/apple_logo.svg"
import IntraLogo from "../assets/42_logo.svg"
import Line112 from "../assets/Line112.svg"
import Line113 from "../assets/Line113.svg"
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import api from '../../../api/posts'
import ResetUserData from '../../../state/UserInfo/ResetUserData'



export const Title = () => {
    return (
        <div className="title">
            <div className="group">
                <div className="div-wrapper">
                    <div className="text-wrapper">Happening now</div>
                </div>
            </div>
            <div className="group-wrapper">
                <div className="div">
                    <div className="text-wrapper-2">Play today</div>
                </div>
            </div>
        </div>
    );
};

export const SignInPlatforme = () => {

    ResetUserData();
    const navigate = useNavigate();

    const handleOnsubmit = async () => {
        console.log("42intra");
        
        window.location.replace('http://localhost:3000/auth/42');

    }


    return (
        <div className="sign-in-platforme">
            <div className="apple">
                <img className="button-content" alt="Button content" src={AppleLogo}/>
                <div className="text-wrapper">Sign up with Apple</div>
            </div>
            <div className="google">
                <img className="img" alt="Button content" src={GoogleLogo} />
                <div className="div">Sign up with Google</div>
            </div>


                    <div className="element-intra" onClick={handleOnsubmit}>
                        <img className="element" alt="Element" src={IntraLogo} />
                        <div className="text-wrapper-2">Sign up with 42intra</div>
                    </div>
        </div>
    );
};

export const OrLine = () => {
    return (
        <div className="OR-line">
            <img className="line" alt="Line" src={Line112} />
            <img className="img" alt="Line" src={Line113} />
            <div className="left-title">or</div>
        </div>
    );
};

export const TermTitle = () => {
    return (
        <div className="title-term">
            <div className="group-term">
                <div className="div-wrapper-term">
                    <div className="text-wrapper-term">Already have an account?</div>
                </div>
            </div>

            <p className="by-signing-up-you">
                <span className="span-term">By signing up, you agree to the </span>
                <span className="text-wrapper-2-term">Terms of Service </span>
                <span className="span-term">and </span>
                <span className="text-wrapper-2-term">Privacy</span>
                <span className="span-term">&nbsp;</span>
                <span className="text-wrapper-2-term">Policy</span>
                <span className="span-term">, including Cookie Use.</span>
            </p>
        </div>
    );
};

//  w-[24rem] h-[37rem] sm:w-[24rem] sm:h-[37rem] md:w-[26.5rem] md:h-[37rem] lg:w-[27rem] lg:h-[37rem] xl:w-[29.5rem] xl:h-[37rem] 2xl:h-[37rem] 2xl:w-mx-auto">
export default function SignInOptions() {

    return (
        <>
            <div className="SignInOptions max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  h-[32rem] w-[25rem]   sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">

                <Title/>
                <SignInPlatforme/>
                <OrLine/>

                <Link to={"/Login/create-account"}>

                    <div className='buttons-target'>
                        <CustomButton
                            classNames="create-account"
                            text="Create account"
                        />
                    </div>

                </Link>

                <TermTitle/>
                <Link to={"/Login/sign-in"}>
                        <div className='buttons-target'>
                            <CustomButton
                                classNames="create-account"
                                text="Sign in"
                            />
                        </div>
                </Link>
 
            
            </div>
        </>   
    );
}
