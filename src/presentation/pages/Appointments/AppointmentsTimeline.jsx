import React from "react";
import { AppointmentStatus } from "../../../data/models/appointment_model";
import { getTime } from "../../../utility/helper";
import styles from "./appointments.module.css";
import patientStyles from "./../Patients/patients.module.css";
import { BsCameraVideo, BsInfo } from "react-icons/bs";
import { CiStethoscope } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const AppointmentsTimeline = ({ appointments, patientsMap }) => {
  console.log(patientsMap);

  const getClassname = (status) => {
    let classes = `${styles.timelineTileTime}`;
    switch (status) {
      case AppointmentStatus.COMPLETED:
        classes += ` ${styles.timelineTileTimeCompleted}`;
        break;
      case AppointmentStatus.PENDING:
        classes += ` ${styles.timelineTileTimePending}`;
        break;
      case AppointmentStatus.CANCELLED:
        classes += ` ${styles.timelineTileTimeCancelled}`;
        break;
      case AppointmentStatus.REJECTED:
        classes += ` ${styles.timelineTileTimeCancelled}`;
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.labels}>
        <div
          className={styles.labelCircle}
          style={{ backgroundColor: "green" }}
        ></div>
        <div className={styles.labelText}>Completed</div>
        <div
          className={styles.labelCircle}
          style={{ backgroundColor: "red" }}
        ></div>
        <div className={styles.labelText}>Cancelled</div>
        <div
          className={styles.labelCircle}
          style={{ backgroundColor: "#f7cb73" }}
        ></div>
        <div className={styles.labelText}>Pending Approval</div>
      </div>
      {appointments.map((category) => (
        <div className={styles.category}>
          <div className={styles.separator}>
            <span>{category[0]}</span>
          </div>
          <div className={styles.verticalLine}></div>
          {category[1].map((appointment) => (
            <div className={styles.timelineTile}>
              <div className={getClassname(appointment.status)}>
                {getTime(appointment.startTime)}
              </div>
              <div className={styles.timelineTileContent}>
                <div style={{ display: "flex" }}>
                  {/* <img
                    src={patientsMap[appointment.patientID].profilePicURL}
                    alt="dp"
                    className={patientStyles.profilePic}
                  ></img> */}
                  <div className={patientStyles.nameAgeDiv}>
                    <p className={patientStyles.name}>
                      {patientsMap[appointment.patientID].name}
                    </p>
                    <p className={patientStyles.age}>
                      {patientsMap[appointment.patientID].age} years{" "}
                      {appointment.status}
                    </p>
                  </div>
                </div>
                <div className={patientStyles.tileActions}>
                  {appointment.status === AppointmentStatus.CANCELLED ||
                  appointment.status === AppointmentStatus.REJECTED ? (
                    <div className={patientStyles.greyIconAction}>
                      <BsInfo size={18} />
                    </div>
                  ) : (
                    ""
                  )}
                  {appointment.status === AppointmentStatus.COMPLETED ? (
                    <div className={patientStyles.iconAction}>
                      <IoChatboxEllipsesOutline size={18} />
                    </div>
                  ) : (
                    ""
                  )}
                  {appointment.status === AppointmentStatus.APPROVED ? (
                    <a
                      className={patientStyles.iconAction}
                      href={`tel:+${
                        patientsMap[appointment.patientID].phoneNumber
                      }`}
                    >
                      <BsCameraVideo size={18} />
                    </a>
                  ) : (
                    ""
                  )}
                  {appointment.status !== AppointmentStatus.REJECTED &&
                  appointment.status !== AppointmentStatus.CANCELLED ? (
                    <div className={patientStyles.action}>
                      <CiStethoscope size={18} />
                      Case History
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
