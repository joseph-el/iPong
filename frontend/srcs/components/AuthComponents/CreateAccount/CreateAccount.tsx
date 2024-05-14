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
import {
    setDateIsInvalid,
    setDateErrorMessage,
    setDateValue,
  } from "../../../state/InputComponents/InputDateComponent/dateSlice";

import {
    setGenderInvalide,
} from "../../../state/Checkbox/CheckboxSlice";

import { useNavigate } from "react-router-dom";
import { isFullNameValid, isEmailValid, isDateOfBirthValid } from '../../../utils/formValidation';
import {GenderType} from '../../../state/Checkbox/CheckboxSlice';

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
    
    const fullname = useSelector((state: RootState) => state.input["create-account-full-name"]?.value);
    const email = useSelector((state: RootState) => state.input["create-account-email"]?.value);
    const date_of_birth = useSelector((state: RootState) => state.date?.value);
    const UserGender = useSelector((state: RootState) => state.gender?.UserGender);
    
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
  
    const handleOnSubmit = () => {
        const errors = getValidationErrors();

        
        if (!errors)  {
            console.log("Fullname: ", fullname);
            console.log("Email: ", email);
            console.log("Date of birth: ", date_of_birth);
            console.log("UserGender: ", UserGender);
            
            navigate("/Login/need-a-password");
        }
         else 
            handleErrors(errors);
    };

    const getValidationErrors = () => {
        if (!fullname ) {
            return { id: 'create-account-full-name', message: 'Fullname required!' };
        } else if (!isFullNameValid(fullname)) {
            return { id: 'create-account-full-name', message: 'Invalid name format' };
        }
    
        if (!email) {
            return { id: 'create-account-email', message: 'Email required!' };
        } else if (!isEmailValid(email)) {
            return { id: 'create-account-email', message: 'Invalid email format' };
        }
    
        if (!date_of_birth) 
            return { id: 'undefined', message: 'Date of birth required!' };
        // } else if (!isDateOfBirthValid(date_of_birth)) {
        //     return { id: 'undefined', message: 'Invalid date, should be after 2005' };
        // }

        if (UserGender == GenderType.UNK) {
            return { id: 'undefined_gender', message: 'User gender required!'};
        }

        return null;
    };
    
    const handleErrors = (error) => {
        const { id, message } = error;
        
        if (id === 'undefined_gender') {
            dispatch(setGenderInvalide({ id, invalide: true }));
            return;
        }
        if (id === 'undefined') {
            dispatch(setDateIsInvalid({ isInvalid: true }));
            dispatch(setDateErrorMessage(message));
        } else {
            dispatch(setIsInvalid({ id, isInvalid: true }));
            dispatch(setErrorMessage({ id, errorMessage: message }));
        }
    };
    
    return (
        <>
            <div className="CreateAccount-competent-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <Close ClassName={"creat-close"}/>

                <div className='CreateAccount-competent'>
                    
                    <div className="text-wrapper-3">Create an account</div>
                 
                        <InputComponent type={"fill"} target={"Full Name"} id="create-account-full-name" placeholder="Enter your full name"/>
                        <InputComponent type={"fill"} target={"Address Email"} id="create-account-email" placeholder="Enter your full email" />

                        <DateOfBirth/>
                        <CustomDateInput/>

                        <div className="gender">
                            <div className="text-wrapper-4">Gender</div>
                        </div>

                        <CustomCheckbox/>

                        <div className='buttons-target' onClick={handleOnSubmit}>
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