import React from "react";
import './iPongAlert.css';

export default function IPongAlert(props) {

    return (
        <div className="alert-ipong">

            <div className="content">
                <div className="title">iPong</div>
                <div className="description">{props.Description}</div>
            </div>
            
            <div className="actions">
                <div className="alert-item">
                    <div className="action" onClick={props.handelLeftButton}>{props.leftButton}</div>
                </div>
                <div className="separator" />

                <div className="action-wrapper">
                    <div className="text-wrapper"  onClick={props.handelRightButton}>{props.rightButton}</div>
                </div>
            </div>

        </div>
    );
  
    

}
