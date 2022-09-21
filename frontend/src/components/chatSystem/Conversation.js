import React, { useState, useEffect } from "react";
import styled from "styled-components";

const conversation = ({
  conversation,
  currentUserId,
  setCurrentChatConversation,
  setClientPicture,
  setNotification,
  notification,
}) => {
  const [client, setClient] = useState(null);

  // fetch client information
  useEffect(() => {
    // find client id inside conversation members
    const clientId = conversation.members.find(
      (member) => member !== currentUserId
    );

    //function that handle the fetch from our database
    const fechingClientInfoHandler = async () => {
      try {
        if (clientId) {
          // fetching client data by user id
          const fetchClientInfoByUserId = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/user/${clientId}`
          );

          // parse the response
          const responseJson = await fetchClientInfoByUserId.json();

          if (responseJson.data) {
            setClient(responseJson.data);
            setClientPicture(responseJson.data.picture);
          }
        }
      } catch (error) {
        console.log(error.stack);
      }
    };

    fechingClientInfoHandler();
  }, [currentUserId, conversation]);

  // calculate how many notification has each user
  let notifCount = 0;

  if (notification && client) {
    notification.map((notif) => {
      if (notif.senderId === client._id) {
        notifCount += 1;
      }
      return notifCount;
    });
  }

  // filter notification array after reading the message
  const removeNotificationHandler = () => {
    setNotification(
      notification.filter((notif) => notif.senderId !== client._id)
    );
  };

  return (
    <UserInfo
      onClick={() => {
        setCurrentChatConversation(conversation);
        removeNotificationHandler();
      }}
      key={conversation._id}
    >
      <ClientPicture src={client?.picture} />
      {notifCount > 0 && <ItemCount>{notifCount}</ItemCount>}
      <UserName>{client?.username}</UserName>
    </UserInfo>
  );
};

// conversation style
const UserInfo = styled.div`
  margin: 0px 15px;
  padding: 20px;
  width: fit-content;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  position: relative;

  :hover {
    background-color: #f5f0ed;
  }
`;

const ClientPicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserName = styled.p`
  font-weight: 700px;
`;

const ItemCount = styled.span`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: white;
  color: black;
  position: absolute;
  top: 15px;

  right: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default conversation;
