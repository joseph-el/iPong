import React from "react";

import { useState, useEffect } from "react";
import "./NavBarUser.css";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
  Image,
  Divider,
} from "@nextui-org/react";

import api from "../../../api/posts";

import { useNavigate } from "react-router-dom";

export default function NavBarUser(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const userName = props.email.split("@")[0];
  const mailType = props.email.split("@")[1];
  const isLongEmail = userName.length > 5 && windowWidth < 1150;
  let truncatedUserName = isLongEmail ? userName.substring(0, 4) : userName;

  const handleOnClick = () => {
    navigate("/ipong/profile");
  };

  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await api.get("/auth/logout");
        setLogout(false);
        navigate("/Auth");
      } catch (error) {
      }
    };
    logout && logoutUser();
  }, [logout]);

  return (
    <div className="flex items-center gap-4 NavBarUser w-max-content  ">
      <Dropdown
        showArrow
        radius="sm"
        className="modal-header-text-color"
        classNames={{
          base: "before:bg-default-700",
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger onClick={props.onClick}>
          <User
            name={props.fullName + " "}
            description={
              truncatedUserName + (isLongEmail ? ".." : "") + "@" + mailType
            }
            avatarProps={{
              src: props.avatar,
            }}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onClick={() => {
              handleOnClick();
            }}
            variant="faded"
          >
            See Profile
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              // handleOnClick(false);
              setLogout(true);
            }}
            variant="faded"
            className="text-danger"
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
