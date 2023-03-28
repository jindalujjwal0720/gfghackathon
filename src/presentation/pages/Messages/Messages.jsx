import React, { useEffect, useRef, useState } from "react";
import { Loading } from "../Empty/Loading";
import styles from "./messages.module.css";
import { IoSend } from "react-icons/io5";
import { USER } from "../../../data/constants and cache/user";
import { getFullTime } from "./../../../utility/helper";
import { getChatrooms } from "../../../data/providers/chatrooms_provider";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// to be hidden later
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "medoi-b2b82.firebaseapp.com",
  projectId: "medoi-b2b82",
  storageBucket: "medoi-b2b82.appspot.com",
  messagingSenderId: "484518016366",
  appId: "1:484518016366:web:ac8f874d5b617e99adbd7f",
});

const firestore = firebase.firestore();

export const Messages = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [openedChatroomID, setOpenedChatroomID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChatrooms(USER.doctor.id).then((rooms) => {
      setChatrooms(rooms);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Messages</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.layout}>
          <div className={styles.chatroomsContainer}>
            {chatrooms &&
              chatrooms.map((chatroom) => (
                <div
                  className={`${styles.chatroomTile} ${
                    chatroom.id === openedChatroomID ? styles.selectedChat : ""
                  }`}
                  onClick={(e) => {
                    console.log(openedChatroomID);
                    setOpenedChatroomID(chatroom.id);
                  }}
                >
                  <img
                    src={chatroom.patientProfilePicURL}
                    alt="dp"
                    className={styles.chatroomImage}
                  ></img>
                  <div>
                    <p className={styles.chatroomName}>
                      {chatroom.patientName}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.chatbox}>
            {openedChatroomID && <Chatbox chatroomID={openedChatroomID} />}
            {!openedChatroomID && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p className={styles.emptyPrompt}>
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const Chatbox = ({ chatroomID }) => {
  const [value, setValue] = useState("");
  const [chats, setChats] = useState([]);
  const dummy = useRef(null);

  const messageRef = firestore
    .collection("chatrooms")
    .doc(`${chatroomID}`)
    .collection("messages");
  const query = messageRef.orderBy("timestamp", "desc").limit(10);

  useEffect(() => {
    const unsubscribe = query.onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(newData);
    });
    // cleanup function
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (value && value.length > 0) {
      const chat = {
        message: value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        sentByID: USER.doctor.id,
      };
      await messageRef.add(chat);
      console.log(chat);
      setValue("");
    }
  };

  const getClasses = (chat) => {
    return `${styles.chatTile} ${
      chat.sentByID === USER.doctor.id ? styles.chatRight : styles.chatLeft
    }`;
  };

  return (
    <div className={styles.chatboxContent}>
      <div className={styles.chats}>
        {chats &&
          chats.map((chat) => (
            <div className={getClasses(chat)}>
              {chat.message}{" "}
              <span className={styles.dummyTime}>
                {chat.timestamp && getFullTime(chat.timestamp)}
              </span>
              <span className={styles.chatTime}>
                {chat.timestamp && getFullTime(chat.timestamp)}
              </span>
            </div>
          ))}
        <div ref={dummy}></div>
      </div>
      <form className={styles.inputContainer} onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          className={styles.chatInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button className={styles.sendButton}>
          <IoSend />
        </button>
      </form>
    </div>
  );
};
