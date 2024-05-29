import React from "react";
import "./ChatPanelFooter.css";
import Autocomplete from "react-google-autocomplete";

import SendMessageIcon from "./Messages-sendIcon.svg";
import {Suggestions} from "./exampleSuggestions";
//

import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";

import { useState } from "react";

export default function ChatPanelFooter() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;    
    const lastWord = newValue.split(' ').pop();
    const filteredSuggestions = Suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(lastWord.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setInputValue(newValue);
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
        endContent={
          <img
            src={SendMessageIcon}
            className="SendMessage"
            alt="Send Message"
          />
        }
      />
    </div>
  );
}
