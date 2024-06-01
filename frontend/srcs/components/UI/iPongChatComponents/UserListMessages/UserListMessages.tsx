import React from "react";
import "./UserListMessages.css";
import { Grid, GridItem, Divider } from "@chakra-ui/react";
import { ScrollShadow } from "@nextui-org/react";
import UserListHeader from "../UserListHeader/UserListHeader";
import MessagesItems from "../MessagesItems/MessagesItems";

const messages = [
  {
    name: "Taha Naceur Elidrissi",
    messageTime: "9:38 PM",
    lastMessage:
      "Nice. I don't know why people get all worked up about Hawaiian pizza. I njknjk",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Touate Django",
    messageTime: "9:45 PM",
    lastMessage: "Hi",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Mohammed Ali",
    messageTime: "10:00 AM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=3",
  }, /*
  {
    name: "Omar Khalifa",
    messageTime: "11:30 AM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Fatima Ahmed",
    messageTime: "1:00 PM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Ali Hassan",
    messageTime: "2:30 PM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Aisha Ibrahim",
    messageTime: "3:45 PM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Youssef Mansour",
    messageTime: "4:15 PM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Layla Mahmoud",
    messageTime: "5:20 PM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Amir Kareem",
    messageTime: "6:40 PM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
  {
    name: "Noura Farid",
    messageTime: "7:10 PM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Ahmed Mahmoud",
    messageTime: "8:30 PM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Yara Fawzi",
    messageTime: "9:45 PM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "Khalid Samir",
    messageTime: "10:20 PM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Sara Ali",
    messageTime: "11:00 PM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Amira Hassan",
    messageTime: "11:30 PM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    name: "Moustafa Ali",
    messageTime: "12:00 AM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=17",
  },
  {
    name: "Nadia Salah",
    messageTime: "12:30 AM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    name: "Karim Adel",
    messageTime: "1:00 AM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=19",
  },
  {
    name: "Rana Ibrahim",
    messageTime: "2:00 AM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    name: "Mohammed Kamal",
    messageTime: "3:00 AM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=21",
  },
  {
    name: "Aya Khaled",
    messageTime: "4:00 AM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=22",
  },
  {
    name: "Aliya Mahmoud",
    messageTime: "5:00 AM",
    lastMessage: "Lorem ipsum dolorsit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=23",
  },
  {
    name: "Ahmad Salem",
    messageTime: "6:00 AM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    name: "Lina Magdi",
    messageTime: "7:00 AM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    name: "Amr Youssef",
    messageTime: "8:00 AM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=26",
  },
  {
    name: "Nada Osama",
    messageTime: "9:00 AM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=27",
  },
  {
    name: "Mahmoud Samir",
    messageTime: "10:00 AM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=28",
  },
  {
    name: "Yasmin Hassan",
    messageTime: "11:00 AM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=29",
  },
  {
    name: "Khaled Adel",
    messageTime: "12:00 PM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=30",
  },
  {
    name: "Hala Tarek",
    messageTime: "1:00 PM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=31",
  },
  {
    name: "Ahmed Yassin",
    messageTime: "2:00 PM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Laila Mohamed",
    messageTime: "3:00 PM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Samiya Karim",
    messageTime: "4:00 PM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=34",
  },
  {
    name: "Karim Salah",
    messageTime: "5:00 PM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    name: "Hassan Mahmoud",
    messageTime: "6:00 PM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    name: "Nora Ahmed",
    messageTime: "7:00 PM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=37",
  },
  {
    name: "Fahad Samir",
    messageTime: "8:00 PM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=38",
  },
  {
    name: "Rana Adel",
    messageTime: "9:00 PM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=39",
  },
  {
    name: "Saeed Kareem",
    messageTime: "10:00 PM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=40",
  },
  {
    name: "Noura Magdy",
    messageTime: "11:00 PM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=41",
  },
  {
    name: "Aliya Mohamed",
    messageTime: "12:00 AM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=42",
  },
  {
    name: "Hassan Mahmoud",
    messageTime: "1:00 AM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=43",
  },
  {
    name: "Nora Ahmed",
    messageTime: "2:00 AM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Fahad Samir",
    messageTime: "3:00 AM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Rana Adel",
    messageTime: "4:00 AM",
    lastMessage:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    avatar: "https://i.pravatar.cc/150?img=46",
  },
  {
    name: "Saeed Kareem",
    messageTime: "5:00 AM",
    lastMessage:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Noura Magdy",
    messageTime: "6:00 AM",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    name: "Aliya Mohamed",
    messageTime: "7:00 AM",
    lastMessage:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "https://i.pravatar.cc/150?img=49",
  },
  {
    name: "Hassan Mahmoud",
    messageTime: "8:00 AM",
    lastMessage:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "https://i.pravatar.cc/150?img=50",
  },*/
];



interface UserListMessagesProps {
  type: string;
  name: string;
  avatar: string;
  lastMessage: string;
  messageTime: string;
  isSelectes: boolean;
}


export default function UserListMessages(props) {
  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "main"`}
      gridTemplateRows={"130px 1fr 30px"}
      h="100%"
      w={"100%"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" w={"full"} area={"header"}>
        <UserListHeader ShowCreateNewChat={props.ShowCreateNewChat} />
      </GridItem>
      <GridItem pl="2" bg="black" className="kkk" area={"main"}>
        <ScrollShadow hideScrollBar className="h-full">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <MessagesItems
                name={message.name}
                messageTime={message.messageTime}
                lastMessage={message.lastMessage}
                avatar={message.avatar}
              />
            </React.Fragment>
          ))}
        </ScrollShadow>
      </GridItem>
    </Grid>
  );
}
