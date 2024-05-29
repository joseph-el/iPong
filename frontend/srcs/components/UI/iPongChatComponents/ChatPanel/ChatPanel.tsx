import React from "react";
import "./ChatPanel.css";

import {RightChatBubbles} from "../ChatBubbles/ChatBubbles";
import {LeftChatBubbles} from "../ChatBubbles/ChatBubbles";


const chatBubbleProps = [
  {
    message: "Hey! 😊 How have you been? 👋🏼 I haven't seen you in so long. Let's catch up soon! 💬🕰️",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    message: "Did you finish the report? 📚 It's due tomorrow and I'm still working on mine. 📝💼🤔",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    message: "I just got back from a trip to the mountains. ⛰️ It was so refreshing and peaceful. 🌄😌",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    message: "Can you believe the game last night? 🏀 It was incredible! I didn't expect that outcome at all. 😱👏",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    message: "Do you have any good book recommendations? 📖 I'm looking for something new to read. 📚🔖",
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    message: "The new cafe down the street has the best coffee I've ever tasted. ☕ You should try it sometime. 😋",
    avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    message: "I'm thinking of starting a garden in my backyard. 🌱 Do you have any tips for a beginner? 🌻🥕",
    avatarUrl: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    message: "What do you think about the new policies at work? 💼 I think they could use some improvement. 🤔",
    avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    message: "I've been learning how to cook new recipes. 🍝 Last night, I made a delicious pasta dish. 🍲",
    avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    message: "The weather has been so unpredictable lately. ☔ One minute it's sunny, the next it's pouring rain. 🌦️",
    avatarUrl: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  {
    message: "I'm really excited about the upcoming concert. 🎵 I've been waiting to see this band live for years. 🎸",
    avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    message: "Do you like to travel? ✈️ I just booked a trip to Japan and I'm so excited to explore the culture and food. 🍣🎎",
    avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    message: "What do you do to relax after a long day? 🎥 I usually watch a movie or read a book. 📖🍿",
    avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg"
  },
  {
    message: "Have you seen the latest episode of that new show? 📺 It's getting so intense! 😱🍿",
    avatarUrl: "https://randomuser.me/api/portraits/women/14.jpg"
  },
  {
    message: "I'm thinking of adopting a pet. 🐾 Do you have any advice on what kind of animal would be best? 🐶🐱",
    avatarUrl: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    message: "The traffic this morning was unbelievable. 🚗 It took me twice as long to get to work. 🚦🕒",
    avatarUrl: "https://randomuser.me/api/portraits/women/16.jpg"
  },
  {
    message: "I just started a new hobby—photography. 📸 It's amazing how much you notice when you start looking through a lens. 🌅",
    avatarUrl: "https://randomuser.me/api/portraits/men/17.jpg"
  },
  {
    message: "Do you enjoy hiking? 🥾 I found a beautiful trail last weekend that you would love. 🏞️🌲",
    avatarUrl: "https://randomuser.me/api/portraits/women/18.jpg"
  },
  {
    message: "I've been working on a new project at work and it's been really challenging but rewarding. 💻📈",
    avatarUrl: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  {
    message: "Have you tried the new restaurant downtown? 🍽️ The food is incredible and the atmosphere is great. 🥂🎉",
    avatarUrl: "https://randomuser.me/api/portraits/women/20.jpg"
  }
];


import { ScrollShadow } from "@nextui-org/react";

export default function ChatPanel() {
    return (
        <div className="ChatPanel-frame">
            <ScrollShadow  hideScrollBar className="ChatPanel-frame">
            {
                chatBubbleProps.map((chatBubble, index) => {
                    return index % 2 === 0 ? (
                        <RightChatBubbles className="RightChatBubbles-frame" key={index} message={chatBubble.message} avatarUrl={chatBubble.avatarUrl} />
                    ) : (
                        <LeftChatBubbles className="LeftChatBubbles-frame" key={index} message={chatBubble.message} avatarUrl={chatBubble.avatarUrl} />
                    );
                })
            }
            </ScrollShadow>
        </div>
    );
}