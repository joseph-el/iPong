import React from "react";
import "./WelcomeNewUser.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../UI/Button/SubmitButton/SubmitButton";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import api from "../../../api/posts";
import { Spacer } from "@nextui-org/react";

export default function WelcomeNewUser(props) {
  const navigate = useNavigate();

  const _fullname = useSelector(
    (state: RootState) => state.input["create-account-full-name"]?.value
  );
  const _email = useSelector(
    (state: RootState) => state.input["create-account-email"]?.value
  );
  const _date_of_birth = useSelector((state: RootState) => state.date?.value);
  const _UserGender = useSelector(
    (state: RootState) => state.gender?.UserGender
  );
  const _password = useSelector(
    (state: RootState) => state.input["set-user-password"]?.value
  );
  const _avatar =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  const _username = useSelector(
    (state: RootState) => state.input["set-user-username"]?.value
  );

  const extractUserData = async () => {
    const __username =  (_UserGender == "MALE" ? "M-;" : "F-;")  + _username ;

    
    await api.post("/auth/signup", {
      username: __username,
      email: _email,
      password: _password,
      firstName: _fullname.split(" ")[0],
      lastName: _fullname.split(" ").slice(1).join(" "),
      bio: "Hey there! I'm using iPong",
      intraId: "UNKNOWN",
      avatar: _avatar,
    });
    navigate("/auth");
  };

  return (
    <>
      <div className="WelcomeNewUser max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden  h-[32rem] w-[25rem]   sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
        <div className="title-welcome">
          <div className="group-welcome">
            <div className="div-wrapper-welcome">
              <div className="text-wrapper-welcome">Welcome to </div>
            </div>
          </div>
          <div className="group-welcome">
            <div className="div-wrapper-welcome">
              <div className="text-wrapper-welcome text-wrapper-welcome-move">iPong</div>
            </div>
          </div>
        </div>

        
        <Spacer y={2} />
        <div className="buttons-target" onClick={extractUserData}>
          <CustomButton classNames="create-account" text={props.button_text} />
        </div>
      </div>
    </>
  );
}
