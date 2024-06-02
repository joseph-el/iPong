import React from 'react';
import "./iPongGame.css";


import Versus3d    from "./assets/Versus-3d.svg";
import UserBadge   from "./assets/user-badge.svg";
import VersusBadge from "./assets/versus-badge.svg";

function UserBadgeComponent(props) {
    return (
        <div className="iPongGame-UserBadge">
            <div className="iPongGame-UserBadge-username">
                {props.username}
            </div>
            <img src={UserBadge} alt="UserBadge" />
        </div>
    )
}

function VersusBadgeComponent(props) {
    return (
        <div className="iPongGame-VersusBadge">
            <img src={VersusBadge} alt="VersusBadge" />
            <div className="iPongGame-UserBadge-username">
                {props.username}
            </div>
        </div>
    )
}

 function IPongGameNav(props) {
    return (
        <div className="iPongGame-frame-nav">
            <VersusBadgeComponent username={props.opponent} />
            <img src={Versus3d} alt="Versus3d" className='Versus3d' />
            <UserBadgeComponent username={props.username} />
        </div>
    )
}




export default function iPongGame() {

    return (
        <div className="iPongGame-frame">

{/* <UserBadgeComponent username={"youusef"} /> */}

            <IPongGameNav username="" opponent="" />
        </div>
    )

}


