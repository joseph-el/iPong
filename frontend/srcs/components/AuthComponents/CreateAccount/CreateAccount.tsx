import React from 'react'
import './CreateAccount.css'
import InputComponent from '../../UI/Input/Input'
import CustomCheckbox from '../../UI/Checkbox/Checkbox'
import Close from '../../UI/Button/CloseButton/CloseButton'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import CustomDateInput from '../../UI/Input/DateInput/CustomDateInput'

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
    return (
        <>
            <div className="CreateAccount-competent-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <Close ClassName={"creat-close"}/>

                <div className='CreateAccount-competent'>
                    
                    <div className="text-wrapper-3">Create an account</div>
                 
                        <InputComponent type={"fill"} target={"Full Name"}/>
                        <InputComponent type={"fill"} target={"Address Email"}/>

                        <DateOfBirth/>
                        <CustomDateInput/>

                        <div className="gender">
                            <div className="text-wrapper-4">Gender</div>
                        </div>

                        <CustomCheckbox/>

                        <div className='buttons-target'>
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