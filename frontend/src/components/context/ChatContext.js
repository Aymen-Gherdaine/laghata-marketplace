import { useState, useEffect } from "react";
import { createContext } from "react";
import socketIOClient from "socket.io-client";
const { REACT_APP_BACKEND_URL } = process.env;

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [currentChatMembers, setCurrentChatMembers] = useState(null);
  const [message, setMessage] = useState("");
  const [chatConversation, setChatConversation] = useState([]);
  const [notification, setNotification] = useState([]);
  const [socket, setSocket] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  // give the user a socket once his loggedin
  useEffect(() => {
    // create socket connection with the server
    const sk = socketIOClient(REACT_APP_BACKEND_URL);

    // store the socket into the socket state
    setSocket(sk);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        currentChatMembers,
        setCurrentChatMembers,
        message,
        setMessage,
        chatConversation,
        setChatConversation,
        notification,
        setNotification,
        socket,
        setSocket,
        openChat,
        setOpenChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
