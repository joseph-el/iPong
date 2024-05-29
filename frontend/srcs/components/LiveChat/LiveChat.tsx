import React from "react";
import "./LiveChat.css";

import LiveChatNavLogo from "./LiveChatNavLogo.svg";
import OnlineIcon from "./online-icon.svg";
import { Grid, GridItem } from "@chakra-ui/react";
import { ScrollShadow, Input } from "@nextui-org/react";
import LiveChatSendIcon from "./LiveChat-send-icon.svg";
import LiveChatBubbles from "../UI/LiveChatBubbles/LiveChatBubbles";
function LiveChatNav(props) {
  return (
    <div className="live-chat-nav">
      <img
        src={LiveChatNavLogo}
        alt="Live Chat Logo"
        className="LiveChatNavLogo"
      />
      <div className="User-online">
        <img src={OnlineIcon} alt="Online Icon" className="OnlineIcon" />
        <div className="User-online-text">Online: </div>
        <div className="User-online-number">10 </div>
      </div>
    </div>
  );
}

const chatBubbles = [
  {
    message: "Hello everyone!",
    fullname: "Youssef Elidrissi",
    avatarLink: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    message: "Wow, this is amazing!",
    fullname: "John Doe",
    avatarLink: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    message:
      "This is by far the best live stream I've attended. The content is rich, the presentation is engaging, and the community is just awesome!",
    fullname: "Warren Buffet",
    avatarLink: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    message: "Can't believe I'm watching this live!",
    fullname: "Jane Smith",
    avatarLink: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    message: "Hi from Morocco!",
    fullname: "Carlos Santana",
    avatarLink: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    message:
      "Wow, this live stream is packed with useful information. I'm taking so many notes and I can't wait to implement these strategies. Thank you for this valuable content!",
    fullname: "J.K. Rowling",
    avatarLink: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    message: "So glad I tuned in!",
    fullname: "Sergey Brin",
    avatarLink: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    message: "Loving the stream!",
    fullname: "Maria Garcia",
    avatarLink: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    message: "Shoutout to the host!",
    fullname: "Adele Adkins",
    avatarLink: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    message: "This is so cool!",
    fullname: "Elon Musk",
    avatarLink: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    message: "First time here, hi everyone!",
    fullname: "Sundar Pichai",
    avatarLink: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    message:
      "Just wanted to say how much I appreciate these live streams. They are incredibly helpful and I look forward to them every week. Keep up the great work!",
    fullname: "Michael Bloomberg",
    avatarLink: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    message: "Greetings from India!",
    fullname: "Satya Nadella",
    avatarLink: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    message: "Love from the UK!",
    fullname: "Bill Gates",
    avatarLink: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    message: "Best live stream ever!",
    fullname: "Tim Cook",
    avatarLink: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    message:
      "This is an incredible resource. I can't thank you enough for all the effort you put into making these live streams so informative and engaging. It's really making a difference!",
    fullname: "Oprah Winfrey",
    avatarLink: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    message:
      "I'm really enjoying this session. The insights are great and it's presented in such an easy-to-understand manner. Thank you for putting this together!",
    fullname: "Sheryl Sandberg",
    avatarLink: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    message:
      "The information shared in this live stream is invaluable. I am learning so much and can't wait to apply this knowledge. Thank you for hosting this!",
    fullname: "Larry Ellison",
    avatarLink: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    message: "Loving the content!",
    fullname: "Mark Zuckerberg",
    avatarLink: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    message: "Hey everyone, what's up?",
    fullname: "Jeff Bezos",
    avatarLink: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    message: "This is awesome!",
    fullname: "Larry Page",
    avatarLink: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    message: "You guys rock!",
    fullname: "Steve Jobs",
    avatarLink: "https://randomuser.me/api/portraits/men/16.jpg",
  },
];

export default function LiveChat() {
  return (
    <div className="live-chat">
      <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={"60px 1fr 70px"}
        gridTemplateColumns={"150px 1fr"}
        h="100%"
      >
        <GridItem pl="2" area={"header"}>
          <LiveChatNav />
        </GridItem>

        <GridItem pl="2" style={{ overflowY: "auto" }}  area={"main"}>
          <ScrollShadow hideScrollBar >
            {chatBubbles.map((chatBubble, index) => (
              <LiveChatBubbles
                key={index}
                avatarLink={chatBubble.avatarLink}
                fullname={chatBubble.fullname}
                message={chatBubble.message}
              />
            ))}
          </ScrollShadow>
        </GridItem>

        <GridItem pl="2" area={"footer"} bg={"transparent"}className="livechat-footer">
          <Input placeholder="Type your message here"  endContent={<img alt="sendbutton" className="LiveChatSendIcon" src={LiveChatSendIcon}  />} />
        </GridItem>
      </Grid>
    </div>
  );
}
