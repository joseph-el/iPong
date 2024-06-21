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
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { Button } from "@nextui-org/react";
import { set } from "lodash";
import "./SearchList.css";
import { setErrorMessage } from "../../../state/InputComponents/inputSlice";
export default function SearchList({ Groups, users, func }) {
  const [values, setValues] = useState<Selection>(new Set(["1"]));
  const navigate = useNavigate();
  const arrayValues = Array.from(values);
  const UserId = useSelector((state: RootState) => state.userState.id);
  const [selectedType, setSelectedType] = useState(
    users.length === 0 && Groups.length > 0 ? "Groups" : "Users"
  );
  const [JoinRoom, setJoinRoom] = useState(false);
  const [GroupNeedPassword, setGroupNeedPassword] = useState(false);

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
  }, [arrayValues.length, selectedType]);

  const [ReadyToJoin, setReadyToJoin] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [IsInvalid, setIsInvalid] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const joinGroup = async () => {
      try {
        console.warn("the room id is: ", ReadyToJoin.id);
        console.warn("the user id is: ", UserId);

        const response = await api.post("/chatroom/join", {
          roomId: ReadyToJoin.id,
          userId: UserId,
          password: ReadyToJoin.type === "protected" ? inputValue : "",
        });

        console.log("response: of join room ", response);
  
          setJoinRoom(false);
          navigate(`/ipong/chatroom/${ReadyToJoin.id}`);
      
      } catch (error) {
        console.error("error join room: ", error);
      }
    };

    if (ReadyToJoin?.IsReady) {
      joinGroup();
    }
  }, [ReadyToJoin]);

  const handelJoinRoom = (type) => {
    if (type === "protected") {
      setJoinRoom(true);
      setGroupNeedPassword(true);
    } else {
      setJoinRoom(true);
      setGroupNeedPassword(false);
    }
  };

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
            items={Groups}
            label="Assigned to"
            onSelectionChange={setValues}
            variant="flat"
          >
            {(item) => (
              <ListboxItem
                key={item.id}
                textValue={item.roomName}
                onClick={() => {
                  handelJoinRoom(item.type);
                  setReadyToJoin(item);
                  console.log("user_selected: ", item.id);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item.roomName}
                    className="flex-shrink-0"
                    size="md"
                    src={item.icon} //
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{item.roomName}</span>
                    <span className="text-tiny text-default-400">
                      {item.type}
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
              className="JoinRoom-frame-grid"
              templateAreas={`
                  "header header"
                  "main main"
                  "footer footer"`}
              gridTemplateRows={"50px 1fr 30px"}
              gridTemplateColumns={"150px 1fr"}
              h="100%"
              fontWeight="bold"
            >
              <GridItem
                pl="2"
                h="full"
                w="full"
                className="JoinRoom-frame-header"
                area={"header"}
              >
                <div className="header">
                  {" "}
                  {ReadyToJoin.type === "protected"
                    ? "Protected Group"
                    : "Public Group"}{" "}
                </div>
              </GridItem>

              <GridItem
                h="full"
                w="full"
                pl="2"
                area={"main"}
                className="JoinRoom-frame-main"
              >
                <div className="User-info">
                  <Avatar
                    isBordered
                    className="User-avatar w-24 h-24"
                    src={ReadyToJoin.icon}
                  />

                  <div className="info">
                    <div className="User-name"> {ReadyToJoin.roomName} </div>
            
                  </div>
                  <p className="small-text descriptions">
                    {ReadyToJoin.type === "protected"
                      ? "To join this exclusive group, a password is required. Reach out to the group's administrator to obtain the key that will grant you access."
                      : "You are about to join this group. Are you sure you want to proceed?"}
                  </p>
                  {GroupNeedPassword && (
                    <Input
                      className="JoinRoom-frame-input-password"
                      isInvalid={IsInvalid}
                      errorMessage={ErrorMessage}
                      onChange={(e) => {
                        if (IsInvalid) {
                          setIsInvalid(false);
                          setErrorMessage("");
                        }
                        setInputValue(e.target.value);
                      }}
                      placeholder="Enter Password"
                      size="md"
                      type="password"
                    />
                  )}
                </div>
              </GridItem>

              <GridItem
                h="full"
                w="full"
                pl="2"
                area={"footer"}
                className="JoinRoom-frame-footer"
              >
                <div className="flex gap-2">
                  <Button
                    size="md"
                    onClick={() => {
                      setJoinRoom(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="md"
                    onClick={() => {
                      if (GroupNeedPassword && inputValue === "") {
                        setIsInvalid(true);
                        setErrorMessage("Password is required");
                        return;
                      }
                      setReadyToJoin({ ...ReadyToJoin, IsReady: true });
                    }}
                  >
                    Join
                  </Button>
                </div>
              </GridItem>
            </Grid>
          </div>
        </ListboxWrapper>
      )}
    </div>
  );
}

/*

createdat: "2024-06-12T08:30:45.361Z"icon: "https://res.cloudinary.com/dnc5talpg/image/upload/v1718181047/iPong/73706cae-34a7-4edd-a844-e042e98a3d3aicon.png"id: "73706cae-34a7-4edd-a844-e042e98a3d3a"ownerId: "6d6d0f22-5a4e-4ea1-b739-bba32c848aa2"password: ""roomName: "pepper Group"type: "public"updatedAt: "2024-06-12T08:30:47.588Z"
activeGroups
*/
