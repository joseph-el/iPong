import React from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import './input.css'
import  { useState } from 'react';

export default function InputComponent({ type, target}) {
    const [isVisible, setIsVisible] = React.useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(email);

    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
      console.log("Email:", email);
      console.log("Password:", password);
  };


    return (
      <Input
        onChange={handleEmailChange}
        label={type == "fill" ? target: ""}
        variant="bordered"
        placeholder={type === "pass" ? "Enter your password" : "Enter your email"}
       
        // isInvalid={true}
        // color={true ? "danger" : "success"}
        // isInvalid={true}
        // errorMessage={type !== "pass" ? "Enter your password" : ""}

        endContent={
          type === "pass" ? (
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          ) : null
        }
        classNames={{
          label: "text-black/50",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
       
            "shadow-xl",
            "bg-default-200/50",
            "backdrop-blur-xl",
           
            "input-border",

            "backdrop-blur-xl",
            "backdrop-saturate-200",
      
          ],
        }}
        


        type={(type != "pass" || isVisible && type === "pass") ? "text" : "password" }
       
        className="max-w-xs"
      />
    );
}
  