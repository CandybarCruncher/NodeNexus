import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./Chats";
import config from "../../../config";
import ErrorHandler from "../ErrorHandler";

// Create individual contexts
export const ChatlogContext = createContext(); //msg history
export const TypingContext = createContext();
export const IsTypingContext = createContext();
export const NodeContext = createContext(); //chat details
export const LoadingContext = createContext();
export const SocketConnectedContext = createContext();
export const NodeListContext = createContext();
export const ClusterListContext = createContext();

const ChatContext = ({ children }) => {
	// State management for each context
	const [nodeListContext, setNodeListContext] = useState([]);
	const [clusterListContext, setClusterListContext] = useState([]);

	const [chatlog, setChatlog] = useState([]);
	const [typing, setTyping] = useState(false); //self
	const [isTyping, setIsTyping] = useState(false); //other
	const [loading, setLoading] = useState(true);

	const { nodeId } = useParams();

	const [node, setNode] = useState([]);
	const [socketConnected, setSocketConnected] = useState(false);

	useEffect(() => {
		socket.emit("join chat", nodeId);
		fetchNode();
		fetchMessages();
		setIsTyping(false);
	}, [nodeId]);

	const fetchNode = async () => {
		try {
			const { data } = await config.get(`/api/cht/${nodeId}`);
			// console.log(data);
			setNode(data);
		} catch (error) {
			ErrorHandler(error);
		}
	};

	const fetchMessages = async () => {
		try {
			const { data } = await config.get(`/api/msg/${nodeId}`);
			setChatlog(data);
			setLoading(false);
		} catch (error) {
			ErrorHandler(error);
		}
	};

	return (
		<ChatlogContext.Provider value={[chatlog, setChatlog]}>
			<TypingContext.Provider value={[typing, setTyping]}>
				<IsTypingContext.Provider value={[isTyping, setIsTyping]}>
					<NodeContext.Provider value={[node, setNode]}>
						<LoadingContext.Provider value={[loading, setLoading]}>
							<SocketConnectedContext.Provider
								value={[socketConnected, setSocketConnected]}
							>
								<NodeListContext.Provider
									value={[nodeListContext, setNodeListContext]}
								>
									<ClusterListContext.Provider
										value={[clusterListContext, setClusterListContext]}
									>
										{children}
									</ClusterListContext.Provider>
								</NodeListContext.Provider>
							</SocketConnectedContext.Provider>
						</LoadingContext.Provider>
					</NodeContext.Provider>
				</IsTypingContext.Provider>
			</TypingContext.Provider>
		</ChatlogContext.Provider>
	);
};

export default ChatContext;
