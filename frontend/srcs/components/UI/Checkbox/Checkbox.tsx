import React from "react";
import { Checkbox } from "@nextui-org/react";
import "./Checkbox.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";


import {
  setGenderInvalide,
  setGender,
} from "../../../state/Checkbox/CheckboxSlice";

export default function CustomCheckbox() {
  const gender_type = useSelector(
    (state: RootState) => state.gender?.UserGender
  );
  const is_invalide = useSelector((state: RootState) => state.gender?.Invalide);

  const dispatch = useDispatch<AppDispatch>();
  const handleMaleChange = () => {
    dispatch(setGenderInvalide(false));
    dispatch(setGender("MALE"));
  };

  const handleFemaleChange = () => {
    dispatch(setGenderInvalide(false));
    dispatch(setGender("FELMALE"));
  };

  return (
    <>
      <div className="flex gap-4">
        <Checkbox
          className="Gender-type"
          isSelected={gender_type == "MALE"}
          onChange={handleMaleChange}
        >
          male
        </Checkbox>
        <Checkbox
          className="Gender-type"
          isSelected={gender_type == "FELMALE"}
          onChange={handleFemaleChange}
        >
          female
        </Checkbox>
      </div>

      {is_invalide && <p className="text-default-500">User gender required!</p>}
    </>
  );
}
