import React from "react";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

import './SearchInput.css'

export default function SearchInput(props) {

  const handleClear = () => {
    props.onChange({ target: { value: '' } });
  };
  
  return (
    <div className="flex justify-center search">
      <div className="flex w-full justify-center w-48 sm:w-48 md:w-64 lg:w-64 xl:w-72 2xl:w-80">
        <Input
          onChange={props.onChange}
          isClearable
          onClear={handleClear} 
          className="SearchInput"
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],

            innerWrapper: ["bg-transparent", "display", "inline-flex"],
           
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
            
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="sss text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
    </div>
  );
}


/*
export default function SearchInput() {
  return (
    // <div className="SearchComponent">
      <Input
        isClearable
        className="SearchInput "
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    // </div>
  );
}

*/