import React from "react";
import { useParams } from "react-router-dom";
import { Chatbox } from "../Messages/Messages";
import styles from "./callscreen.module.css";

export const CallScreen = () => {
  const { chatID } = useParams();
  return (
    <div className={styles.screen}>
      <div className={styles.left}>
        <div className={styles.generateReportContainer}>
          <GenerateReport />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.callWindow}>
          {/* Here Video Call Component will come */}
        </div>
        <div className={styles.chatWindow}>
          <Chatbox id={chatID} />
        </div>
      </div>
    </div>
  );
};

const GenerateReport = () => {
  return (
    <>
      <h1 className={styles.heading}>Generate Report</h1>
    </>
  );
};
