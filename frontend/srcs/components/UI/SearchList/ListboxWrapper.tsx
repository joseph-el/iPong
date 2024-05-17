import React from "react";

export const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
  <div className="w-full max-w-[335px] border-small px-1 py-2 rounded-small bg-black border-default-200 ">
    {children}
  </div>
);
