import React from "react";
import "./UserListMessages.css";
import { Grid, GridItem, Divider } from "@chakra-ui/react";
import {ScrollShadow} from "@nextui-org/react";
import UserListHeader from "../UserListHeader/UserListHeader";
import MessagesItems from "../MessagesItems/MessagesItems";

const messages = [
    { 
        name: "Taha Naceur elidrissi", 
        messageTime: "9:38 PM", 
        lastMessage: "Nice. I don't know why people get all worked up about Hawaiian pizza. I njknjk",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    { 
        name: "Touate Django", 
        messageTime: "9:45 PM", 
        lastMessage: "Hi",
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    { 
        name: "Touate Django", 
        messageTime: "9:45 PM", 
        lastMessage: "wach akhy hani",
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    { 
        name: "Jane Doe", 
        messageTime: "10:15 AM", 
        lastMessage: "Just finished reading that book. Highly recommend it!",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    { 
        name: "John Smith", 
        messageTime: "2:45 PM", 
        lastMessage: "Meeting rescheduled to tomorrow. Please confirm your availability. Lorem kds kd  jdlqs sd dsfdjsk sdlkfjbds qsYEZ ZELSDJBFDLF SDLFDS",
        avatar: "https://i.pravatar.cc/150?img=4"
    },
    { 
        name: "Alice Johnson", 
        messageTime: "1:30 PM", 
        lastMessage: "Loved the new cafe downtown. Great atmosphere and coffee!",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    { 
        name: "Bob Brown", 
        messageTime: "8:00 AM", 
        lastMessage: "Looking forward to the weekend. Any plans?",
        avatar: "https://i.pravatar.cc/150?img=6"
    },
    { 
        name: "Charlie Davis", 
        messageTime: "5:55 PM", 
        lastMessage: "Can you send me the report by EOD?",
        avatar: "https://i.pravatar.cc/150?img=7"
    },
    { 
        name: "Diana Evans", 
        messageTime: "12:20 PM", 
        lastMessage: "Just signed up for the marathon. Training starts tomorrow.",
        avatar: "https://i.pravatar.cc/150?img=8"
    },
    { 
        name: "Ethan Foster", 
        messageTime: "4:10 PM", 
        lastMessage: "Had a great time at the concert last night. Amazing performance!",
        avatar: "https://i.pravatar.cc/150?img=9"
    },
    { 
        name: "Fiona Green", 
        messageTime: "9:00 AM", 
        lastMessage: "Could we have a quick call to discuss the project details?",
        avatar: "https://i.pravatar.cc/150?img=10"
    },
    { 
        name: "George Harris", 
        messageTime: "3:15 PM", 
        lastMessage: "Happy birthday! Hope you have a fantastic day!",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    { 
        name: "Hannah Irwin", 
        messageTime: "7:25 PM", 
        lastMessage: "The new recipe turned out great. Will bring some to work tomorrow.",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    { 
        name: "Ian Jacobs", 
        messageTime: "11:50 AM", 
        lastMessage: "Thanks for the help with the presentation. It went really well.",
        avatar: "https://i.pravatar.cc/150?img=13"
    },
    { 
        name: "Julia Kim", 
        messageTime: "6:40 PM", 
        lastMessage: "Don't forget about the team dinner tonight at 7.",
        avatar: "https://i.pravatar.cc/150?img=14"
    },
    { 
        name: "Kevin Lee", 
        messageTime: "8:45 PM", 
        lastMessage: "Any updates on the project status?",
        avatar: "https://i.pravatar.cc/150?img=15"
    }
];


export default function UserListMessages() {
  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "main"`}
      gridTemplateRows={"130px 1fr 30px"}
      // gridTemplateColumns={'150px 1fr'}
      h="100%"
      w={"100%"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" w={"full"} area={"header"}>
        <UserListHeader />
      </GridItem>
      <GridItem pl="2" bg="black" className="kkk" area={"main"}>
        
      <ScrollShadow hideScrollBar className=" h-[600px]">

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
