import React from 'react'
import './SetUserNameAndPicture.css'
import InputComponent from '../../UI/Input/Input'
import Close from '../../UI/Button/CloseButton/CloseButton'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import {Avatar} from "@nextui-org/react";


export const UserNameTitle = () => {

    return (
        <div className="date-of-birth">
            <p className="this-will-not-be">
                Your <span className='user-name'>@username</span> is unique. You can always change it later.
            </p>
        </div>
    );

};

export default function SetUserNameAndPicture() {
    return (
            <div className="SetUserNameAndPicture-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <Close ClassName={"creat-close"}/>

                <div className='SetUserNameAndPicture'>
               
                    <div className="text-wrapper-3">Pick a profile pictures</div>

                    <div className='picture-target'>
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
                    </div>


                    <div className="text-wrapper-4">What should we call you?</div>

                    <UserNameTitle/>

                        <InputComponent type={"fill"} target={"username"}/>
        
                    <div className='buttons-target'>
                            <CustomButton
                                classNames="create-account"
                                text="Next"
                            />
                    </div>
                    
                </div>

                
                 
            </div> 
    );
}