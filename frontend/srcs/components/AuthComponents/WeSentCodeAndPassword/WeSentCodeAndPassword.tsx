import React from 'react'
import './WeSentCodeAndPassword.css'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import InputComponent from '../../UI/Input/Input'
import Close from '../../UI/Button/CloseButton/CloseButton'

export const UserGuide = () => {
    return (
      <div className="user-name-alert">
        <p className="this-will-not-be-user">
          Your <span className="user-name">@username</span> is unique. You can
          always change it later.
        </p>
      </div>
    );
  };


export default function WeSentCodeAndPassword({props}) {
    return (
        <div className="WeSentCodeAndPassword-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
            <Close ClassName={"close"}/>


            <div className='WeSentCodeAndPassword'>
                <div className="text-wrapper-3">Pick a profile picture</div>
                
                <UserGuide/>
                
                
                <div className="input-padding">
                    <InputComponent type={"fill"} target={"username"} />
                </div>
                
                <div className="buttons-target">
                    <CustomButton classNames="create-account" text="Next" />
                 </div>

            </div>

        </div>

    );

};