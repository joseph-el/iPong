import React from 'react'
import './SignIn.css'
import CustomButton from '../../UI/Button/CustomButton'
import Effect from '../assets/maskgroup.svg'


export const Box = () => {
    return (
        <div className="box">
            <img className="mask-group" alt="Mask group" src={Effect} />
        </div>
    );
};
    


export default function SignIn() {

    return (
        <>
            <div className="sign-in-competent max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  h-[32rem] w-[25rem]   sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <div className="title">
                    <div className="group">
                        <div className="div">Sign in to iPong</div>
                    </div>
                </div>
         

            </div>
        </>   
    );
}



