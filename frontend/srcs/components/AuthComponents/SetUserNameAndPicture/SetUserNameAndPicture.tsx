import React from 'react'
import './SetUserNameAndPicture.css'
import InputComponent from '../../UI/Input/Input'
import Close from '../../UI/Button/CloseButton/CloseButton'
import CustomButton from '../../UI/Button/SubmitButton/SubmitButton'
import {Avatar} from "@nextui-org/react";
import GestUser from "../assets/gest_user.svg"
import {CameraIcon} from '../../UI/icon/CameraIcon';

import { useState } from "react";

export const UserNameTitle = () => {
  return (
    <div className="user-name-alert">
      <p className="this-will-not-be-user">
        Your <span className="user-name">@username</span> is unique. You can
        always change it later.
      </p>
    </div>
  );
};

export default function SetUserNameAndPicture() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="SetUserNameAndPicture-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
      <div className="SetUserNameAndPicture">
        <Close ClassName={"creat-close"} />

        <div className="text-wrapper-3">Pick a profile picture</div>

        <div className="picture-target">

          <Avatar src={!selectedImage ? GestUser : selectedImage} className="w-32 h-32 text-large" />
       
          <div className="camera-icon-padding">
            <label htmlFor="fileInput">
              <Avatar
                className="camera-icon-size cursor-pointer"
                showFallback
                src="https://images.unsplash.com/broken"
                fallback={
                  <CameraIcon
                    className="animate-pulse w-6 h-6 text-default-500"
                    fill="currentColor"
                    size={20}
                  />
                }
              />
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="text-wrapper-4">What should we call you?</div>

        <UserNameTitle />

        <div className="input-padding">
          <InputComponent type={"fill"} target={"username"} />
        </div>

        <div className="buttons-target">
          <CustomButton classNames="create-account" text="Next" />
        </div>
      </div>
    </div>
  );
}
