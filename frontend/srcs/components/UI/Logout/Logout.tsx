import React from "react";
import CustomButton from "../Button/SubmitButton/SubmitButton";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { Avatar } from "@nextui-org/react";
import "./Logout.css";


export default function Logout(props) {

  return (
 
    <div className="logout-component">
      <ListboxWrapper >



        <div className="user-info">

        <Avatar
            className="User-avatar"
            src="https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg"
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
        <ListboxItem key="new" color="success" >See Profile </ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
            Logout
        </ListboxItem>
      
      </Listbox>
    </div>
      
      </ListboxWrapper>
    </div>
    
  );
}
