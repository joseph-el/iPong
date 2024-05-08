import PropTypes from "prop-types";
import React from "react";
import "./CustomButton.css";

export default function CustomButton ({ text = "Create Account" }) {
    return (
        <div className="create-account">
            <div className="group">
                <div className="div-wrapper">
                    <div className="text-wrapper">{text}</div>
                </div>
            </div>
        </div>
    );
};

