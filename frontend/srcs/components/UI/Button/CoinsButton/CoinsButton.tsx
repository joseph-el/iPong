import React from "react";
import './CoinsButton.css'
import CoinsIcon from './coins.svg'

export default function CoinsButton(props) {
    return (
        <div className="flex items-center justify-center">
            <div className="price bg-white rounded-md flex items-center">
                <img className="v-bucks-removebg w-6 h-6 object-cover mr-1" alt="V bucks removebg" src={CoinsIcon}/>
                <div className="text-wrapper text-black font-semibold text-lg flex-grow">
                    
                    {props.coins.length > 4 ? props.coins.substring(0, 4) + '...' : props.coins}
                    
                </div>
            </div>
        </div>
    );
};