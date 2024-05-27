import React from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import "./CustomDateInput.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";

import {
  setDateIsInvalid,
  setDateErrorMessage,
  setDateValue,
} from "../../../../state/InputComponents/InputDateComponent/dateSlice";

export default function CustomDateInput() {
  const isInvalid = useSelector((state: RootState) => state.date?.isInvalid);
  const errorMessageState = useSelector(
    (state: RootState) => state.date?.errorMessage
  );
  const dispatch = useDispatch();

  const handleDateChange = (newValue) => {
    dispatch(setDateIsInvalid(false));
    dispatch(setDateErrorMessage(""));
    dispatch(setDateValue(newValue.toString()));
  };

  return (
    <div className="input-borders">
      <div
        key={"bordered"}
        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <DateInput
          variant={"bordered"}
          label={"Birth date"}
          isInvalid={isInvalid}
          errorMessage={errorMessageState}
          placeholderValue={new CalendarDate(1995, 11, 6)}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}
