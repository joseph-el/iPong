import React from "react";
import CloseIcon from './Close.svg'

export default function Close() {
    return (
        <div className="close">
            <img className="SF-symbol-xmark" alt="Sf symbol xmark" src={CloseIcon} />
        </div>
    );
};