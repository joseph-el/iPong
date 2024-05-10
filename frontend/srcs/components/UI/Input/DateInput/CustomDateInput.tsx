import React from "react";
import {DateInput} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";
import './CustomDateInput.css'

export default function CustomDateInput() {

  return (
    <div className="input-borders">
        <div key={"bordered"} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <DateInput  variant={"bordered"} label={"Birth date"} placeholderValue={new CalendarDate(1995, 11, 6)}  />
        </div>
    </div>  
  );
}
