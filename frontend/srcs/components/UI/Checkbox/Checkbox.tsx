import React from "react";
import {Checkbox} from "@nextui-org/react";

export default function CustomCheckbox() {
  return (
    <div className="flex gap-1">
      <Checkbox select-none >Option</Checkbox>
      <Checkbox defaultSelected>Option</Checkbox>
    </div>  
  );
}
