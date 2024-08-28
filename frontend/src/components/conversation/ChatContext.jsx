import React, { createContext, useState } from "react";

// Create individual contexts
export const ChatlogContext = createContext();
export const TypingContext = createContext();
export const IsTypingContext = createContext();
export const ChatId = createContext();
const ChatContext = ({ children }) => {
	// State management for each context
	const [chatlog, setChatlog] = useState([]);
	const [typing, setTyping] = useState(false); //self
	const [isTyping, setIsTyping] = useState(false); //other

	return (
		
	<ChatlogContext.Provider value={[chatlog, setChatlog]}>
				<TypingContext.Provider value={[typing, setTyping]}>
					<IsTypingContext.Provider value={[isTyping, setIsTyping]}>
						{children}
					</IsTypingContext.Provider>
				</TypingContext.Provider>
			</ChatlogContext.Provider>);
};

export default ChatContext;
