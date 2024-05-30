import React from "react";
import "./ChatPanelFooter.css";
import Autocomplete from "react-google-autocomplete";

import SendMessageIcon from "./Messages-sendIcon.svg";
import { Suggestions } from "./exampleSuggestions";
//

import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";

import { useState } from "react";

export default function ChatPanelFooter() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [style, setStyle] = useState("30px");

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (!newValue) {
    setStyle("20px");

      setSuggestions([]);
      setInputValue(newValue);
      return;
    }
    const lastWord = newValue.split(" ").pop();
    const filteredSuggestions = Suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(lastWord.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      setStyle("20px");
      setSuggestions([]);
      setInputValue(newValue);
      return;
    }
    setStyle("0px");
    setSuggestions(filteredSuggestions);
    setInputValue(newValue);
  };
  const handleSuggestionClick = (suggestion) => {
    const words = inputValue.split(" ");
    words.pop();
    setInputValue(words.join(" ") + " " + suggestion);
    setSuggestions([]);
    setStyle("20px");
  };

  return (
    <div className="ChatPanelFooter-frame"  >
      <div className="autocomplete"  style={{ marginTop: style }} >
        {suggestions.slice(0, 6).map((suggestion, index) => (
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
