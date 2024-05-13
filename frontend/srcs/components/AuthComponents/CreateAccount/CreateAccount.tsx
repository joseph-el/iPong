import React from 'react'
import './CreateAccount.css'
import InputComponent from '../../UI/Input/Input'
import CustomCheckbox from '../../UI/Checkbox/Checkbox'
import Close from '../../UI/Button/CloseButton/CloseButton'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import CustomDateInput from '../../UI/Input/DateInput/CustomDateInput'
import { LoginState } from '../LoginState/LoginState'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import InputState from '../../../state/InputComponents/inputSlice'
import {
  setColor,
  setIsInvalid,
  setErrorMessage,
  setValue,
} from "../../../state/InputComponents/inputSlice";
import { useNavigate } from "react-router-dom";

export const DateOfBirth = () => {

    return (
        <div className="date-of-birth">
            <p className="this-will-not-be">
                This will not be shown publicly. Confirm your own age, even if this <br />
                account is for a business, a pet, or something else.
            </p>
            <div className="text-wrapper">Date of birth</div>
        </div>
    );

};


export default function CreateAccount() {
    
    const fullname = useSelector((state: RootState) => state.input["creat-accout-full-nam"]?.value);
    const password = useSelector((state: RootState) => state.input["creat-accout-email"]?.value);

  
    const handelonSubmit = () => {
        var state: LoginState = LoginState.UNK;
    
    
    
    
    }
    
    return (
        <>
            <div className="CreateAccount-competent-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <Close ClassName={"creat-close"}/>

                <div className='CreateAccount-competent'>
                    
                    <div className="text-wrapper-3">Create an account</div>
                 
                        <InputComponent type={"fill"} target={"Full Name"} id="creat-accout-full-name" placeholder="Enter your full name"/>
                        <InputComponent type={"fill"} target={"Address Email"} id="creat-accout-email" placeholder="Enter your full email" />

                        <DateOfBirth/>
                        <CustomDateInput/>

                        <div className="gender">
                            <div className="text-wrapper-4">Gender</div>
                        </div>

                        <CustomCheckbox/>

                        <div className='buttons-target' onClick={handelonSubmit}>
                            <CustomButton
                                classNames="create-account"
                                text="Next"
                            />
                        </div>

                </div>


            </div>
        </>
    ); 
}