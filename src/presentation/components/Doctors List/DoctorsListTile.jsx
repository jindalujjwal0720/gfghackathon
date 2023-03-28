import React from "react";
import styles from "./doctors_list.module.css";
import { Rating } from "./../helper/Rating";

export const DoctorsListTile = ({ doctor }) => {
  return (
    <div className={styles.tile}>
      <img
        src={doctor.profileImageURL}
        alt="avatar"
        className={styles.avatar}
      />
      <div className={styles.content}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className={styles.name}>{doctor.name}</h4>
          <Rating rating={doctor.rating} />
        </div>
        <p className={styles.work}>
          <span className={styles.workspan}>{doctor.speciality}</span> -{" "}
          {doctor.workingArea}
        </p>
        <p className={styles.price}> ₹ {doctor.pricePerAppointment}</p>
        <button className={styles.appointment}>Appointment</button>
      </div>
    </div>
  );
};
