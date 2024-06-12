import React, { useEffect } from "react";
import { useState } from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
  Input,
} from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import api from "../../../api/posts";
import { useNavigate } from "react-router-dom";
import { getAvatarSrc } from "../../../utils/getAvatarSrc";
import { Grid, GridItem } from "@chakra-ui/react";

import { Button } from "@nextui-org/react";
import { set } from "lodash";
export default function SearchList({ Groups, users, func }) {
  const [values, setValues] = useState<Selection>(new Set(["1"]));
  const navigate = useNavigate();
  const arrayValues = Array.from(values);

  const [selectedType, setSelectedType] = useState(
    users.length === 0 && Groups.length > 0 ? "Groups" : "Users"
  );
  const [JoinRoom, setJoinRoom] = useState(false);
  const [GroupNeedPassword, setGroupNeedPassword] = useState(false);
  console.log("selectedType: ", selectedType);

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
          <Chip
            color={selectedType === "Users" ? "primary" : "default"}
            className="Chip-Selected"
            onClick={() => {
              setSelectedType("Users");
            }}
          >
            Users
          </Chip>
        </div>

        <br></br>

        <div className="search-title">
          <Chip
            className="Chip-Selected"
            color={selectedType === "Groups" ? "primary" : "default"}
            onClick={() => {
              setSelectedType("Groups");
            }}
          >
            Groups
          </Chip>
        </div>
      </ScrollShadow>
    );
  }, [arrayValues.length]);



  const handelJoinRoom = () => {
    
  }


  return (
    <div className="list-search-box-items">
      {selectedType === "Users" && !JoinRoom && (
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
                  func();
                  navigate(`/ipong/users/${item.UserId}`);
                  console.log("user_selected: ", item.UserId);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item.name}
                    className="flex-shrink-0"
                    size="md"
                    src={getAvatarSrc(item.avatar, item.gender)} //
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
      )}

      {selectedType === "Groups" && !JoinRoom && (
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
                  // func();
                  handelJoinRoom();

                  console.log("user_selected: ", item.UserId);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item.name}
                    className="flex-shrink-0"
                    size="md"
                    src={"#"} //
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
      )}

      {JoinRoom && (
        <ListboxWrapper>
          <div className="JoinRoom-frame">
            <Grid
              templateAreas={`
                  "header header"
                  "main main"
                  "footer footer"`}
              gridTemplateRows={"50px 1fr 30px"}
              gridTemplateColumns={"150px 1fr"}
              h="100%"
              color="blackAlpha.700"
              fontWeight="bold"
            >
              <GridItem
                pl="2"
                h="full"
                w="full"
                bg="orange.300"
                area={"header"}
              >
                <div>This Group is protected</div>
              </GridItem>

              <GridItem h="full" w="full" pl="2" area={"main"}>

                {GroupNeedPassword && (
                  <div className="User-info">
                    <Avatar
                      isBordered
                      className="User-avatar w-24 h-24"
                      src={""}
                    />

                    <div className="info">
                      <div className="User-name"> Peepper Group </div>
                      <div className="ipongchar">iPong</div>
                    </div>
                    <p className="small-text">
                      To join this exclusive group, a password is required.
                      Reach out to the group's administrator to obtain the key
                      that will grant you access.
                    </p>
                  </div>
                )}

                {!GroupNeedPassword && (
                  <div className="Group-NeedPassword">
                    <Input
                      placeholder="Enter Password"
                      size="md"
                      type="password"
                    />
                    <Button size="md"
                    
                    >Join</Button>
          
                  </div>
                )}
              </GridItem>

              <GridItem h="full" w="full" pl="2" area={"footer"}>
                <div className="flex gap-2">
                  <Button size="md">Cancel</Button>
                  <Button size="md"    >Join</Button>
                </div>
              </GridItem>
            </Grid>
          </div>
        </ListboxWrapper>
      )}


    </div>
  );
}
