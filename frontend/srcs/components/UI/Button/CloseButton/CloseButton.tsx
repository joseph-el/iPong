import React from "react";
import CloseIcon from './Close.svg'
import './CloseButton.css'
import BackIcon from './Back.svg'

export default function Close({ClassName, func, id}) {
    return (
        <div className={ClassName} >
            <img onClick={func} className="SF-symbol-xmark" alt="Sf symbol xmark" src={ id == "close"? CloseIcon: BackIcon} />
        </div>
    );
};