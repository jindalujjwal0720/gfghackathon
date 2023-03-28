import React, { useEffect, useState } from "react";
import { getApprovedAppointments } from "../../../data/providers/appointments_provider";
import { Loading } from "../Empty/Loading";
import styles from "./appointments.module.css";
import helperStyles from "./../helper/helper.module.css";
import { BsCheckCircle as ApproveIcon } from "react-icons/bs";
// import { FiClock as RescheduleIcon } from "react-icons/fi";
// import {
//   MobileDateTimePicker as DateTimePicker,
//   LocalizationProvider,
// } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const getDate = (timestamp) => {
  let dateformat = Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(timestamp);
  return dateformat;
};

const getTime = (timestamp) => {
  let dateformat = Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
  }).format(timestamp);
  return dateformat;
};

export const AppointmentsList = ({ doctorID }) => {
  const [appointments, setAppointments] = useState([]);
  const [rowSpans, setRowSpans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApprovedAppointments().then((value) => {
      // calculation of Row Spans
      if (value.length > 0) {
        let dates = value.map((e) => getDate(e.startTime));
        let temp = [],
          c = 0,
          prev = dates[0];
        for (let date of dates) {
          if (date === prev) {
            c++;
          } else {
            temp.push(c);
            for (let i = 1; i < c; i++) temp.push(0);
            c = 1;
            prev = date;
          }
        }
        if (c > 0) {
          temp.push(c);
          for (let i = 1; i < c; i++) temp.push(0);
          c = 0;
        }
        setRowSpans(temp);
        setAppointments(value);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={helperStyles.table}>
            <thead className={helperStyles.tableHead}>
              <tr className={helperStyles.tableHeadRow}>
                <th className={helperStyles.tableHeadCell}>Date</th>
                <th className={helperStyles.tableHeadCell}>Time</th>
                <th className={helperStyles.tableHeadCell}>Status</th>
                <th className={helperStyles.tableHeadCell}>Duration</th>
                {/* <th className={helperStyles.tableHeadCell}>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index} className={helperStyles.tableRow}>
                  <td
                    rowSpan={rowSpans[index] > 0 ? rowSpans[index] : 1}
                    style={rowSpans[index] === 0 ? { display: "none" } : {}}
                    className={helperStyles.tableCell}
                  >
                    {getDate(appointment.startTime)}
                  </td>
                  <td className={helperStyles.tableCell}>
                    {getTime(appointment.startTime)}
                  </td>
                  <td className={helperStyles.tableCell}>
                    <ApproveIcon color="green" size={16} />
                  </td>
                  <td className={helperStyles.tableCell}>
                    {appointment.duration + " min"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
