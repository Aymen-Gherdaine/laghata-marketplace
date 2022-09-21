import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import Conversation from "../chatSystem/Conversation";
import { ChatContext } from "../context/ChatContext";
import { BiSend } from "react-icons/bi";
import { Circles } from "react-loader-spinner";
import { useUser } from "../hooks/useUser";

const AdminPage = () => {
  const { socket, setNotification, notification } = useContext(ChatContext);

  // get user info from useUser hook
  const user = useUser();

  const [chatLoading, setChatLoading] = useState(false);
  const [chatConversation, setChatConversation] = useState([]);
  const [currentChatConversation, setCurrentChatConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [comingMessage, setComingMessage] = useState("");
  const [clientPicture, setClientPicture] = useState();

  // using ref to scroll to bottom inside div messages
  const scrollToBottomRef = useRef();

  // receiving messages from socket server
  useEffect(() => {
    if (socket) {
      socket?.on("getMessage", (data) => {
        setComingMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: new Date(Date.now()),
        });
      });
    }
  }, [socket]);

  // checking if the message that we receive came from a user that is member in this chat
  useEffect(() => {
    comingMessage &&
      currentChatConversation?.members.includes(comingMessage.senderId) &&
      setMessages((prev) => [...prev, comingMessage]);
  }, [comingMessage, currentChatConversation]);

  // fetching conversation by user id
  useEffect(() => {
    try {
      // function that handle the fetch from our database
      const fechingConversationHandler = async () => {
        // fetching conversation data by user id
        const fetchConversationByUserId = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/conversation/${user?._id}`
        );

        // parse the response
        const responseJson = await fetchConversationByUserId.json();

        if (responseJson.data.length > 0) {
          setChatConversation(responseJson.data);
        }
      };
      fechingConversationHandler();
    } catch (error) {
      console.log(error.stack);
    }
  }, [user?._id]);

  // fetch all messages for specific chat
  useEffect(() => {
    setChatLoading(true);
    // function that handle the fetch of messages
    const chatMessagesHandler = async () => {
      try {
        // fetching messages data by chat id
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/messages/${currentChatConversation?._id}`
        );

        // parse the response
        const responseJson = await response.json();

        if (responseJson.data.length > 0) {
          setMessages(responseJson.data);
          setChatLoading(false);
        }
      } catch (error) {
        console.log(error.stack);
        setChatLoading(false);
      }
      setChatLoading(false);
    };
    chatMessagesHandler();
  }, [currentChatConversation]);

  // function that handle the send of messages
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const receiverId = currentChatConversation.members.find(
      (member) => member !== user?._id
    );

    const messageinfo = {
      senderId: user?._id,
      text: newMessage,
      receiverId: receiverId,
      conversationId: currentChatConversation._id,
      createAt: new Date(Date.now()),
    };

    socket.emit("sendMessage", {
      senderId: user?._id,
      receiverId: receiverId,
      text: newMessage,
    });

    setNewMessage("");

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageinfo),
      };

      // post messages to db
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/message`,
        requestOptions
      );

      if (response.ok) {
        setMessages([...messages, messageinfo]);
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  // finction to scroll to bottom when reveiving or sending messages
  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <AdminPageWrapper>
      <AdminChatContainer>
        {chatConversation && (
          <>
            <ChatUser>
              {chatConversation.map((conversation) => {
                return (
                  <>
                    <Conversation
                      key={conversation._id}
                      conversation={conversation}
                      currentUserId={user?._id}
                      setCurrentChatConversation={setCurrentChatConversation}
                      setClientPicture={setClientPicture}
                      setNotification={setNotification}
                      notification={notification}
                    />
                  </>
                );
              })}
            </ChatUser>

            {chatLoading ? (
              <Circles
                height="30"
                width="30"
                color="#242526"
                ariaLabel="circles-loading"
                wrapperClass="spinner"
                visible={true}
              />
            ) : (
              <ChatDiv>
                {currentChatConversation ? (
                  <>
                    <MsgDiv>
                      {messages.map((message, index) => {
                        return (
                          <MessageWrapper key={index}>
                            {message.senderId !== user?._id ? (
                              <RightMsg key={message._id}>
                                <MsgEl>{message.text}</MsgEl>
                                <Img src={clientPicture} alt="RenterProfile" />
                              </RightMsg>
                            ) : (
                              <LeftMsg key={message._id}>
                                <Img src={user?.picture} alt="RenterProfile" />
                                <MsgEl>{message.text}</MsgEl>
                              </LeftMsg>
                            )}
                          </MessageWrapper>
                        );
                      })}
                    </MsgDiv>

                    <Form onSubmit={sendMessageHandler}>
                      <Input
                        value={newMessage}
                        placeholder="Message"
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" ? sendMessageHandler(e) : null
                        }
                      />
                      <SendButton type="submit">
                        <BiSend className="sendIcon" />
                      </SendButton>
                    </Form>
                  </>
                ) : (
                  <ChatFirstMsg>No chat selected</ChatFirstMsg>
                )}
              </ChatDiv>
            )}
          </>
        )}
      </AdminChatContainer>
    </AdminPageWrapper>
  );
};

// admin page style
const AdminPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f5f0ed;
  position: relative;
`;

const AdminChatContainer = styled.div`
  max-width: 950px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  .spinner {
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ChatUser = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const ChatFirstMsg = styled.span`
  font-size: 50px;
  width: 100%;
  text-align: center;
  color: #f5f5f3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 700px) {
    font-size: 35px;
  }
`;

const ChatDiv = styled.div`
  margin: 20px 0;
  padding: 10px;
  height: 70vh;
  background-image: url("https://cdn.wallpapersafari.com/19/15/HlpKYq.png");
  background-size: contain;
  position: relative;
  border-radius: 25px;

  @media screen and (max-width: 700px) {
    height: 60vh;
  }
`;
const Form = styled.div``;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 9px 10px;
`;

const RightMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
  padding-top: 13px;
`;
const LeftMsg = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const MsgDiv = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: 90%;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #f5f0ed;
    border-radius: 50px;
  }

  ::-webkit-scrollbar-track {
    background: #f5f0ed;
    border-radius: 50px;
  }

  @media screen and (max-width: 700px) {
    height: 85%;
  }
`;
const MsgEl = styled.div`
  background-color: #fff;
  width: fit-content;
  border-radius: 25px;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 400;
`;

const Input = styled.input`
  position: absolute;
  bottom: 7px;
  left: 10px;
  padding-left: 9px;
  width: 90%;
  height: 40px;
  outline: none;
  border-radius: 25px;
  border: 1px solid white;
  color: white;
  background-color: transparent;

  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;

const SendButton = styled.button`
  border: 1px solid white;
  .sendIcon {
    font-size: 40px;
    color: #f5f0ed;
    position: absolute;
    bottom: 10px;
    right: 20px;
    border-radius: 50%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default AdminPage;
