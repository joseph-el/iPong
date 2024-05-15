import React from 'react'
import './WelcomeNewUser.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'


export default function WelcomeNewUser(props) {

    return (
        <>
            <div className="WelcomeNewUser max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  h-[32rem] w-[25rem]   sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <div className="title-welcome">
                    <div className="group-welcome">
                        <div className="div-wrapper-welcome">
                            <div className="text-wrapper-welcome">Welcome to </div>
                        </div>
                    </div>
                    <div className="group-welcome">
                        <div className="div-wrapper-welcome">
                            <div className="text-wrapper-welcome">iPong</div>
                        </div>
                    </div>
                </div>
            
                <Link to="/login" className="login-link">
                    <div className='buttons-target'>
                        <CustomButton
                            classNames="create-account"
                            text={props.button_text}
                        />
                    </div>
                </Link>


            </div>
        </>
    );
    
}