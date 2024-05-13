import React from "react";
import {Checkbox} from "@nextui-org/react";
import './Checkbox.css'
import { useState } from 'react';

export default function CustomCheckbox() {
  const [maleSelected, setMaleSelected] = useState(0);
  
  const handleMaleChange = () => {
    setMaleSelected(1);
  };

  const handleFemaleChange = () => {
    setMaleSelected(2);
  };

  
  return (
    <div className="flex gap-4">
      <Checkbox className="Gender-type" defaultSelected={maleSelected == 1} onChange={handleMaleChange}>male</Checkbox>
      <Checkbox className="Gender-type" defaultSelected={maleSelected == 2} onChange={handleFemaleChange}>female</Checkbox>
    </div>  
  );
}

