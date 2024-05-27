import React from "react";
import "./SearchList.css";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="list-search-box">
    <div className="w-full  w-[226px] sm:w-48  md:w-64 lg:w-64 xl:w-72 2xl:w-80          border-small px-1 py-2 rounded-small bg-black  ">
      {children}
    </div>
  </div>
);
