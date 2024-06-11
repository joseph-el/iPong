import { Button } from "@nextui-org/react";
import React from "react";
import "./iPongLeadingPage.css";

import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
export default function IPongLeadingPage() {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Auth");
    }
    return (
        <div className="iPong-Leading-page">
            <Button size="lg" className=" animate-pulse   ddddd button" onClick={handleClick} >ENTER iPong AREA </Button>
        </div>
    )
}