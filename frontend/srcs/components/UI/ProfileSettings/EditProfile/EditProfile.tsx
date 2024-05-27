import React from "react";
import "./EditProfile.css";
import { EditProfileWrapper } from "./EditProfileWrapper";
import CoverImage from "../../../../pages/iPongProfile/assets/cover-image.jpeg";
import {
  Avatar,
  Button,
  Input,
  cn,
  Textarea,
  Switch,
  ScrollShadow,
} from "@nextui-org/react";
import { CameraIcon } from "./CameraIcon";

const EditProfileNavbar = (props) => {
  return (
    <div className="EditProfileNavbar">
      <div className="overlap-group">
        <div className="text-wrapper">Edit Profile</div>
        <div className="push-button">
          <div
            className="EditProfileNavbar-button"
            onClick={props.closeEditProfile}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EditProfile(props) {
  const InputTypes = [
    {
      type: "email",
      placeholder: "Youssef El idrissi",
      label: "Name:\f\f\f\f\f\f\f",
    },
    {
      type: "text",
      placeholder: "joseph-el",
      label: "Username:",
    },
    {
      type: "Textarea",
      placeholder:
        "Unraveling the mysteries of life, from cells to ecosystems. Join the journey! 🌱🔬 Science and discovery.",
      label: "Bio:\f\f\f\f\f\f\f\f\f\f\f\f",
    },
    {
      type: "text",
      placeholder: "germany",
      label: "Location:\f\f\f",
    },
    {
      type: "text",
      placeholder: "https://www.linkedin.com/in/youssef-el-idrissi-1b1b1b1b1",
      label: "Linkedin:\f\f\f",
    },
    {
      type: "text",
      placeholder: "https://www.github.com/youssef-el-idrissi-1b1b1b1b1",
      label: "Github:\f\f\f\f\f\f",
    },
  ];
  return (
    <EditProfileWrapper>
      <EditProfileNavbar closeEditProfile={props.closeEditProfile} />
      <div className="profile-cover-edit-profile">
        <img
          className="user-cover-image-edit-profile"
          alt="NextUI Fruit Image with Zoom"
          src={CoverImage}
        />
        <Avatar
          src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
          className="w-24 h-24 text-large avatar-edit-profile"
        />
        <div className="edit-avatar-edit-profile">
          <CameraIcon size={25} />
        </div>
        <Button
          startContent={<CameraIcon size={20} />}
          color="primary"
          size="sm"
          className="Change-cover-button-edit-profile"
        >
          {" "}
          Edit Cover
        </Button>
      </div>

      <div className="edit-profile-form">
        <ScrollShadow size={5} className="h-[350px]" hideScrollBar>
          {InputTypes.map((input, index) =>
            input.type === "Textarea" ? (
              <Textarea
                key={index}
                labelPlacement="outside-left"
                label={input.label}
                value={input.placeholder}
                className="input-edit-profile"
                classNames={{
                  label: "text-black50",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                }}
                placeholder={input.placeholder}
              />
            ) : (
              <Input
                size={"md"}
                labelPlacement="outside-left"
                key={index}
                value={input.placeholder}
                type={input.type}
                label={input.label}
                className="input-edit-profile"
                classNames={{
                  label: "text-black50",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                }}
                placeholder={input.placeholder}
              />
            )
          )}
          <div className="switch-edit-profile">
            <Switch
              isDisabled={true}
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                  "justify-between cursor-pointer rounded-md gap-2 p-4 border-2 border-transparent"
                ),
              }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-black50"> Verification Badge </p>
                <p className="w-full font-normal !outline-none focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground h-full bg-transparent text-black/90 dark:text-white/90 placeholder:text-default-700/50 dark:placeholder:text-white/60 is-filled">
                  You need at least level 3 to get the verification badge.
                </p>
              </div>
            </Switch>
          </div>
        </ScrollShadow>
      </div>
    </EditProfileWrapper>
  );
}
