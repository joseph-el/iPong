import React from "react";
import CustomButton from "../Button/SubmitButton/SubmitButton";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { Avatar } from "@nextui-org/react";
import "./Logout.css";

export default function Logout(props) {
  return (
    <div className="logout-component">
      <ListboxWrapper>
        <div className="user-info">
          <Avatar
            className="User-avatar"
            src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
            size="lg"
          />

          <header className="header">
            <div className="title">Taha Naceur</div>
          </header>

          <div className="User-email">
            <div className="type">tahanaceur42@icloud.ma</div>
          </div>

          <div className="profile-info">
            <div className="profile-name-wallet">
              <div className="group">
                <div className="div-wrapper">
                  <div className="text-wrapper">@tnaceur</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="logout-buttons">
          <Listbox
            aria-label="Actions"
            className="listbox"
            // onAction={(key) => alert(key)}
          >
            <ListboxItem key="new" color="success">
              See Profile{" "}
            </ListboxItem>
            <ListboxItem key="delete" className="text-danger" color="danger">
              Logout
            </ListboxItem>
          </Listbox>
        </div>
      </ListboxWrapper>
    </div>
  );
}
