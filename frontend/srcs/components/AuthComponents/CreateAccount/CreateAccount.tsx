import React from 'react'
import './CreateAccount.css'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import InputComponet from '../../UI/Input/Input'
import Close from '../../UI/Button/CloseButton/CloseButton'

export default function CreateAccount() {
    return (
        <>
            <div className="CreateAccount-competent max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
                <Close ClassName={"creat-close"}/>

            </div>
        </>
    ); 
}