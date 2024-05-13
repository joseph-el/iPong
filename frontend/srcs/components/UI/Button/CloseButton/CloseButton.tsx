import React from "react";
import CloseIcon from './Close.svg'

export default function Close({ClassName}) {
    return (
        <div className={ClassName}>
            <img className="SF-symbol-xmark" alt="Sf symbol xmark" src={CloseIcon} />
        </div>
    );
};