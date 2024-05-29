import React from "react";
import "./ChatBubbles.css";

import { Avatar } from "@nextui-org/avatar";

export function RightChatBubbles(props) {
  return (
    <>
      <div className="RightChatBubbles-frame">
        <Avatar
          className="User-avatar w-14 h-14"
          src="https://scontent.frba4-1.fna.fbcdn.net/v/t39.30808-1/417474877_1084959666153312_6596618040732418232_n.jpg?stp=dst-jpg_p480x480&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHwTc_R7JPrAPtBWxFRaFe-erb5zxyu1hd6tvnPHK7WF9S_wr1S8zpCfu2aMDYk7-iTba5XwscZ6PA2aqXg6Q-h&_nc_ohc=r3Gu5KyihjkQ7kNvgGYZlZx&_nc_ht=scontent.frba4-1.fna&oh=00_AYBJlWqZwMOPo4HJqEk88jKQPnd68pOIPERWEytk02mbZw&oe=6658F8C7"
         
        />
        <div className="yours messages">
          <div className="message last">{props.message}</div>
        </div>
      </div>
    </>
  );
}

export function LeftChatBubbles(props) {}
