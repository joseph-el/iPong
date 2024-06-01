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
            src="https://scontent.fcmn1-2.fna.fbcdn.net/v/t39.30808-6/340242838_159501407041277_2734451423562002343_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFyvo2pTF2mgIKANMob3z8USQ34jUDh201JDfiNQOHbTVONa7_GVq_51GNSwIdNq3o3_3XY57rylLV5N4uofeIH&_nc_ohc=Okm3Jt5r4DoQ7kNvgFvUVUq&_nc_ht=scontent.fcmn1-2.fna&oh=00_AYBnMKq1nwB-R-wVuQCwpnEe2lySQW1DXDZZnBw3hNuViQ&oe=66610A17"
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
