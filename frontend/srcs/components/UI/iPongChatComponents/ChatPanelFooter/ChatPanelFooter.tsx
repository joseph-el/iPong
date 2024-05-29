import React from "react";
import "./ChatPanelFooter.css";
import Autocomplete from "react-google-autocomplete";

import SendMessageIcon from "./Messages-sendIcon.svg";

// 

import { Input } from "@nextui-org/input";
import {Chip} from "@nextui-org/chip";

import { useState } from 'react';

export default function ChatPanelFooter() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const exampleSuggestions = ["Hello", "How are you?", "What's up?", "Good morning", "Good evening"];

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    const filteredSuggestions = exampleSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(newValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="ChatPanelFooter-frame">
      <div className="autocomplete">
        {suggestions.map((suggestion, index) => (
          <Chip key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </Chip>
        ))}
      </div>

      <Input
        className="ChatPanelFooter-Input"
        value={inputValue}
        placeholder="Type a message"
        onChange={handleInputChange}
        endContent={<img src={SendMessageIcon} className="SendMessage" alt="Send Message" />}
      />
    </div>
  );
}

