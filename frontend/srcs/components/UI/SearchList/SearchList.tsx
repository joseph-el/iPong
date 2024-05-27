import React from "react";
import { useState } from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
} from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { users } from "./data";

export default function SearchList({ users }) {
  const [values, setValues] = useState<Selection>(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        <div className="search-title">
          <Chip> Users </Chip>
        </div>
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <div className="list-search-box-items">
      <ListboxWrapper>
        <Listbox
          topContent={topContent}
          classNames={{
            base: "max-w-lg ",
            list: "max-h-[300px] overflow-scroll",
          }}
          items={users}
          label="Assigned to"
          onSelectionChange={setValues}
          variant="flat"
        >
          {(item) => (
            <ListboxItem
              key={item.id}
              textValue={item.name}
              onClick={() => {
                console.log("user_selected: ", item.name);
              }}
            >
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={item.name}
                  className="flex-shrink-0"
                  size="md"
                  src={item.avatar}
                />
                <div className="flex flex-col">
                  <span className="text-small">{item.name}</span>
                  <span className="text-tiny text-default-400">
                    {item.email}
                  </span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
}
