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

export const getChatrooms = async (doctorID) => {
  let rooms = [];
  const chatroomsRef = firestore.collection("chatrooms");
  const query = chatroomsRef.where("doctorID", "==", doctorID);
  const querySnapshot = await query.get();
  querySnapshot.forEach((doc) => {
    rooms.push({ id: doc.id, ...doc.data() });
  });
  return rooms;
};
