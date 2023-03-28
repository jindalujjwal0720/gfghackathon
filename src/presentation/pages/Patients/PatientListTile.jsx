import React from "react";
import styles from "./patients.module.css";
import { IoCallOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { CiStethoscope } from "react-icons/ci";

export const PatientListTile = ({ patient }) => {
  return (
    <div className={styles.patientListTile}>
      <div style={{ display: "flex" }}>
        <img
          src={patient.profilePicURL}
          alt="dp"
          className={styles.profilePic}
        ></img>
        <div className={styles.nameAgeDiv}>
          <p className={styles.name}>{patient.name}</p>
          <p className={styles.age}>{patient.age} years</p>
        </div>
      </div>
      <div className={styles.tileActions}>
        <div className={styles.action}>
          <CiStethoscope size={18} />
          Case History
        </div>
        <div className={styles.iconAction}>
          <IoChatboxEllipsesOutline size={18} />
        </div>
        <a className={styles.iconAction} href={`tel:+${patient.phoneNumber}`}>
          <IoCallOutline size={18} />
        </a>
      </div>
    </div>
  );
};
