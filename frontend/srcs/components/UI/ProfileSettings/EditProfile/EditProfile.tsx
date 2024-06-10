import React, { useEffect } from "react";
import "./EditProfile.css";
import { EditProfileWrapper } from "./EditProfileWrapper";
import {
  Avatar,
  Button,
  Input,
  cn,
  Textarea,
  Spacer,
  Switch,
  ScrollShadow,
} from "@nextui-org/react";
import { CameraIcon } from "./CameraIcon";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { getAvatarSrc } from "../../../../utils/getAvatarSrc";
import { getUserLevel } from "../../../../utils/getCurrentLevel";
import { isValidURL } from "../../../../utils/isValidURL";
import { validateEmail } from "../../../../utils/formValidation";
import { isFullNameValid } from "../../../../utils/formValidation";
import validateUsername from "../../../../utils/usernameValidation";
import api from "../../../../api/posts";

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
  const UserInfo = useSelector((state: RootState) => state.userState);
  const [formData, setFormData] = useState({
    name: UserInfo.firstName + " " + UserInfo.lastName,
    email: UserInfo.email,
    username: UserInfo.username,
    bio: UserInfo.bio || "",
    linkedInLink: UserInfo.linkedInLink || "",
    githubLink: UserInfo.githubLink || "",
  });

  const [isSelected, setIsSelected] = useState(UserInfo.isVerified);
  const [ReadyForSubmit, setReadyForSubmit] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [AvatarFile, setAvatarFile] = useState(null);
  const [errorInput, setErrorInput] = useState([]);
  const [CoverFile, setCoverFile] = useState(null);
  const [error, setError] = useState("");

  const InputTypes = [
    {
      type: "text",
      placeholder: "set your name here",
      label: "Name:\f\f\f\f\f\f",
      name: "name",
    },
    {
      type: "text",
      placeholder: "set your username here",
      label: "Username:",
      name: "username",
    },
    {
      type: "email",
      placeholder: "set your email here",
      label: "Email:\f\f\f\f\f\f",
      name: "email",
    },
    {
      type: "Textarea",
      placeholder: "set your bio here",
      label: "Bio:\f\f\f\f\f\f\f\f\f\f\f",
      name: "bio",
    },
    {
      type: "text",
      placeholder: "https://www.linkedin.com/in/",
      label: "Linkedin:\f\f",
      name: "linkedInLink",
    },
    {
      type: "text",
      placeholder: "https://www.github.com/",
      label: "Github:\f\f\f\f\f",
      name: "githubLink",
    },
  ];

  const handleChange = (e) => {
    if (errorInput) setErrorInput([]);
    if (error.length > 0) setError("");
    const { name, value } = e.target;
    if (name === "bio" && value.length > 100) return;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    const SubmitData = async () => {
      await api.post("/users/update", {
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ").slice(1).join(" "),
        email: formData.email,
        username: formData.username,
        bio: formData.bio,
        githubLink: formData.githubLink,
        linkedInLink: formData.linkedInLink,
        isVerified: isSelected,
      });

      if (AvatarFile) {
        const formDataAvatar = new FormData();
        formDataAvatar.append("file", AvatarFile!);

        try {
          await api.post(
            "user-profile/avatar",
            formDataAvatar,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        } catch (error) {
          console.log("error upload avatar :", error);
        }
      }

      if (CoverFile) {
        const formDataAvatar = new FormData();
        formDataAvatar.append("file", CoverFile!);

        try {
          await api.post(
            "user-profile/cover",
            formDataAvatar,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
   
        } catch (error) {
          console.log("error upload avatar :", error);
        }
      }

      props.closeEditProfile();
    };
    ReadyForSubmit && SubmitData();
  }, [ReadyForSubmit]);

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("File size should not exceed 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        if (type === "avatar" && (image.width < 50 || image.height < 50)) {
          setError("Avatar image should be at least 50x50 pixels");
        } else if (
          type === "cover" &&
          (image.width < 600 || image.height < 200)
        ) {
          setError("Cover image should be at least 500x200 pixels");
        } else {
          setError("");
          if (type === "avatar") {
            setAvatarFile(file);
            setSelectedAvatar(reader.result);
          } else if (type === "cover") {
            setCoverFile(file);
            setSelectedCover(reader.result);
          }
        }
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDone = async () => {
    // console.log("formData: ", formData);

    // Check empty fields
    if (formData.name.length === 0) {
      setErrorInput({ type: 0, error: "Name cannot be empty" });
      return;
    }

    if (formData.username.length === 0) {
      setErrorInput({ type: 1, error: "Username cannot be empty" });
      return;
    }

    if (formData.email.length === 0) {
      setErrorInput({ type: 2, error: "Email cannot be empty" });
      return;
    }

    // Check for valid inputs

    if (!isFullNameValid(formData.name)) {
      setErrorInput({ type: 0, error: "Invalid name" });
      return;
    }

    if (
      formData.username.length !== 0 &&
      formData.username !== UserInfo.username
    ) {
      const ret = await validateUsername(formData.username);
      if (ret !== null) {
        setErrorInput({ type: 1, error: ret });
        return;
      }
    }

    if (formData.email.length !== 0 && formData.email !== UserInfo.email) {
      const emailError = await validateEmail(formData.email);
      if (emailError) {
        setErrorInput({ type: 2, error: emailError });
        return;
      }
    }

    if (formData.bio.length === 0) {
      formData["bio"] = "\f\f\f\f\f\f\f\f";
    }

    if (formData.linkedInLink.length !== 0) {
      if (!isValidURL(formData.linkedInLink, "linkedin")) {
        setErrorInput({ type: 4, error: "Invalid Linkedin link" });
        return;
      }
    }

    if (formData.githubLink.length !== 0) {
      if (!isValidURL(formData.githubLink, "github")) {
        setErrorInput({ type: 5, error: "Invalid Github link" });
        return;
      }
    }

    console.log("ALL GOOD");
    setReadyForSubmit(true);
    // TODO: call CloseEditProfile function from parent component
  };


  return (
    <EditProfileWrapper>
      <EditProfileNavbar closeEditProfile={handleDone} />

      <div className="profile-cover-edit-profile">
        <img
          className="user-cover-image-edit-profile"
          alt="NextUI Fruit Image with Zoom"
          src={!selectedCover ? UserInfo.cover : selectedCover}
        />
        <Avatar
          src={getAvatarSrc(
            !selectedAvatar ? UserInfo.picture : selectedAvatar,
            UserInfo.gender
          )}
          className="w-24 h-24 text-large avatar-edit-profile"
        />
        <div className="edit-avatar-edit-profile cursor-pointer">
          <label htmlFor="avatarInput">
            <Avatar
              className="camera-icon-size cursor-pointer"
              showFallback
              src="https://images.unsplash.com/broken"
              fallback={
                <CameraIcon
                  className="animate-pulse w-[20px] h-[20px]"
                  fill="currentColor"
                  size={20}
                />
              }
            />
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => handleImageChange(event, "avatar")}
          />
        </div>
        <Button
          startContent={<CameraIcon size={20} />}
          color="primary"
          size="sm"
          className="Change-cover-button-edit-profile"
          onClick={() => document.getElementById("coverInput").click()}
        >
          Edit Cover
        </Button>
        <input
          type="file"
          id="coverInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => handleImageChange(event, "cover")}
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="edit-profile-form">
        <ScrollShadow size={5} className="h-[350px]" hideScrollBar>
          {InputTypes.map((input, index) =>
            input.type === "Textarea" ? (
              <Textarea
                key={index}
                labelPlacement="outside-left"
                label={input.label}
                defaultValue={formData[input.name]}
                value={formData[input.name]}
                className="input-edit-profile"
                classNames={{
                  label: "text-black50",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                }}
                placeholder="Enter your description"
                onChange={handleChange}
                name={input.name}
              />
            ) : (
              <Input
                errorMessage={errorInput.error}
                isInvalid={errorInput.type == index}
                isDisabled={input.name === "email" && UserInfo.intraId !== ""} // TODO: Enable email when intra id is empty
                size={"md"}
                labelPlacement="outside-left"
                key={index}
                value={formData[input.name]}
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
                onChange={handleChange}
                name={input.name}
              />
            )
          )}
          <div className="switch-edit-profile">
            <Switch
              isSelected={isSelected}
              onValueChange={setIsSelected}
              isDisabled={getUserLevel(UserInfo.xp) < 3}
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
        {/* <Button
          onClick={handleDone}
          className="done-button-edit-profile"
          color="primary"
          size="sm"
        >
          Done
        </Button> */}
      </div>
    </EditProfileWrapper>
  );
}
