import PropTypes from "prop-types";
import React from "react";
import "./SubmitButton.css";

export default function CustomButton ({ text, classNames, onClick  }) {
    return (
        <div className={classNames} onClick={onClick}>
            <div className="group">
                <div className="div-wrapper">
                    <div className="text-wrapper">{text}</div>
                </div>
            </div>
        </div>
    );
};

