import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";
import { BiSend } from "react-icons/bi";
import { ChatContext } from "../context/ChatContext";

const Chat = ({
  picture,
  renterUsername,
  openChat,
  setOpenChat,
  currentUserName,
  currentUserPicture,
  currentUserId,
  renterId,
}) => {
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const {
    currentChatMembers,
    setCurrentChatMembers,
    message,
    setMessage,
    chatConversation,
    setChatConversation,
    notification,
    setNotification,
    socket,
  } = useContext(ChatContext);

  // using ref to scroll to bottom inside div messages
  const scrollToBottomRef = useRef();

  // using useRef to prevent useEffect from running twice as it does in version 18
  // without this method it will create a conversation twice each time
  const effectRanOnce = useRef(false);

  // create new conversation if we don't find one when user open the chat
  useEffect(() => {
    if (effectRanOnce.current === false) {
      const createNewConversationHandler = async () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: currentUserId,
            receiverId: renterId,
            createAt: Date.now(),
          }),
        };

        try {
          // post a new conversation between the renter and the current user
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/conversation`,
            requestOptions
          );

          // parse the response
          const parseResponse = await response.json();

          if (parseResponse.status === 201) {
            setCurrentChatMembers(parseResponse.data);
          }
        } catch (error) {
          console.log(error.stack);
        }
      };
      createNewConversationHandler();

      // cleanup function
      return () => {
        // set the effectRanOnce to true to prevent useEffect from running twice
        effectRanOnce.current = true;
      };
    }
  }, [currentUserId, renterId]);

  // fetching conversation by user id
  useEffect(() => {
    try {
      // function that handle the fetch from our database
      const fechingConversationHandler = async () => {
        // fetching conversation data by user id
        const fetchConversationByUserId = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/conversation/${currentUserId}`
        );

        // parse the response
        const responseJson = await fetchConversationByUserId.json();

        if (responseJson.data.length > 0) {
          const findConversation = responseJson.data.find((conversation) => {
            return (
              (conversation.members[0] === currentUserId &&
                conversation.members[1] === renterId) ||
              (conversation.members[1] === currentUserId &&
                conversation.members[0] === renterId)
            );
          });

          setCurrentChatMembers(findConversation);
        }
      };
      fechingConversationHandler();
    } catch (error) {
      console.log(error.stack);
    }
  }, []);

  // first initialisation with the server
  useEffect(() => {
    if (socket) {
      // emiting information details to the server
      socket.emit("welcome-message", { currentUserName, renterUsername });
      socket.emit("initialisation-add-user", currentUserId);

      // recieving the welcome message from the server and store it in welcome msg state
      socket.on("welcome-response", (message) => {
        setWelcomeMsg(message);
      });
    }
  }, [socket, currentUserName, currentUserId]);

  // fetch all messages for specific chat
  useEffect(() => {
    // function that handle the fetch of messages
    const chatMessagesHandler = async () => {
      try {
        // fetching messages data by chat id
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/messages/${currentChatMembers?._id}`
        );

        // parse the response
        const responseJson = await response.json();

        if (responseJson.data.length > 0) {
          setChatConversation(responseJson.data);
        }
      } catch (error) {
        console.log(error.stack);
      }
    };
    chatMessagesHandler();
  }, [currentChatMembers]);

  // receiving new messages from the server
  useEffect(() => {
    if (socket) {
      // getting messege from the server
      socket.on("getMessage", (data) => {
        if (
          currentChatMembers?.members?.includes(data.senderId) === true &&
          currentChatMembers?.members?.includes(data.sendToId) === true
        ) {
          setChatConversation([...chatConversation, data]);
        } else if (!openChat && !notification.includes(data)) {
          setNotification([...notification, data]);
        }
      });
    }
  }, [socket, chatConversation, notification, openChat]);

  // function that handle the send of messages
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const messageinfo = {
      senderId: currentUserId,
      conversationId: currentChatMembers?._id,
      receiverId: renterId,
      text: message,
      createAt: Date.now(),
    };

    // emit the message to socketio server
    socket.emit("sendMessage", messageinfo);

    setMessage("");

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
        setChatConversation([...chatConversation, messageinfo]);
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  // custom hook to check and close if we click outside the chat
  let ref = useClickOutside(() => {
    setOpenChat(false);
  });

  // finction to scroll to bottom when reveiving or sending messages
  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatConversation]);

  return (
    <ChatWrapper ref={ref}>
      {openChat && (
        <ChatWindow>
          <ChatDiv>
            {chatConversation.length === 0 && (
              <WelcomMsgDiv>
                <Img src={picture} alt="userProfile" />
                <WelcomeMsg>{welcomeMsg.text}</WelcomeMsg>
              </WelcomMsgDiv>
            )}
            <MsgDiv>
              {chatConversation.map((msg, index) => {
                return (
                  <MessageWrapper key={index} ref={scrollToBottomRef}>
                    {msg.senderId !== currentUserId &&
                    msg.senderId === renterId ? (
                      <RightMsg>
                        <MsgEl key={index}>{msg.text}</MsgEl>
                        <Img src={picture} alt="RenterProfile" />
                      </RightMsg>
                    ) : (
                      msg.senderId === currentUserId &&
                      msg.receiverId === renterId && (
                        <LeftMsg>
                          <Img src={currentUserPicture} alt="userProfile" />
                          <MsgEl>{msg.text}</MsgEl>
                        </LeftMsg>
                      )
                    )}
                  </MessageWrapper>
                );
              })}
            </MsgDiv>
          </ChatDiv>
          <form onSubmit={sendMessageHandler}>
            <Input
              value={message}
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? sendMessageHandler(e) : null
              }
            />
            <SendButton type="submit">
              <BiSend className="sendIcon" />
            </SendButton>
          </form>
        </ChatWindow>
      )}
      <Button
        onClick={() => {
          // toggle the open and close of the chat
          setOpenChat(!openChat);
        }}
      >
        <Msg className="msg-display">Hey i'm {renterUsername}!</Msg>
        <img src={picture} alt="renter picture" />
      </Button>
    </ChatWrapper>
  );
};

// chat style
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const ChatWindow = styled.div`
  width: 290px;
  height: 400px;
  border: 1px solid #000;
  background-color: #f5f5f3;
  border-radius: 10px;
  transition: all 0.5s ease;

  border: 1px solid;
  z-index: 99999;
  position: relative;
`;

const ChatDiv = styled.div`
  height: 340px;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 50px;
  }

  ::-webkit-scrollbar-track {
    background: #f5f0ed;
    border-radius: 50px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
  }
`;
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

const MsgDiv = styled.div`
  /* max-height: 345px; */
`;
const MsgEl = styled.div`
  background-color: #fff;
  width: fit-content;
  border-radius: 25px;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 400;
`;

const WelcomMsgDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  padding-top: 13px;
`;
const WelcomeMsg = styled.div`
  background-color: #fff;
  width: 80%;
  border-radius: 25px;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 400;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Input = styled.textarea`
  position: absolute;
  bottom: 7px;
  left: 5px;
  padding-left: 9px;
  padding-top: 10px;
  width: 85%;
  height: 40px;
  outline: none;
  border-radius: 25px;
  border: 1px solid #000;
  background-color: transparent;
`;

const SendButton = styled.button`
  position: absolute;
  bottom: 7px;
  right: 5px;
  height: 40px;
  width: 10%;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  border: 1px solid;

  :hover {
    border: none;
    transform: scale(0.9);
  }

  .sendIcon {
    font-size: 22px;
    color: #242526;
  }
`;
const Msg = styled.div`
  background: #000;
  color: #f5f0ed;
  padding: 7px 10px;
  border-radius: 25px;
  opacity: 0;
  cursor: pointer;
  transition: all 0.4s ease;
  font-size: 15px;

  :hover {
    opacity: 1;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  height: 80px;
  cursor: pointer;
  transition: all 0.33s ease;

  :hover {
    .msg-display {
      opacity: 1;
    }
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

export default Chat;
