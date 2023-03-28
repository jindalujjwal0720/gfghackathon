import React, { useEffect, useState } from "react";
import {
  approvePendingAppointment,
  getPendingAppointments,
  rejectPendingAppointment,
} from "../../../data/providers/appointments_provider";
import { Loading } from "./../Empty/Loading";
import styles from "./appointments.module.css";
import helperStyles from "./../helper/helper.module.css";
import {
  MdOutlinePending as PendingIcon,
  MdOutlineCancel as RejectIcon,
} from "react-icons/md";
import { BsCheckCircle as ApproveIcon } from "react-icons/bs";
import { Modal, ModelContent } from "../helper/Modal";

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

export const PendingAppointmentsList = ({ doctorID }) => {
  const [appointments, setAppointments] = useState([]);
  const [rowSpans, setRowSpans] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [modalContentAppointment, setModalContentAppointment] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const closeRejectModal = () => {
    setShowRejectModal(false);
  };

  const openRejectModal = (e, appointment) => {
    setModalContentAppointment(appointment);
    setShowRejectModal(true);
  };

  const submitRejectModal = async (e, appointment, reason) => {
    if (reason.length > 0) {
      setIsLoading(true);
      await rejectPendingAppointment(appointment.id, reason);
      setShowRejectModal(false);
      setIsLoading(false);
    }
  };

  const submitApproved = async (e, appointment) => {
    setIsLoading(true);
    await approvePendingAppointment(appointment.id);
    setIsLoading(false);
  };

  useEffect(() => {
    getPendingAppointments().then((value) => {
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
          <Modal show={showRejectModal} backgroundOpacity={0.3}>
            <ModelContent onClose={closeRejectModal}>
              <div>
                <h4>Reject Appointment</h4>
                <label htmlFor="reject-note-input">Reason for rejection?</label>
                <input
                  type="text"
                  id="reject-note-input"
                  required
                  onChange={(e) => setRejectReason(e.target.value)}
                ></input>
              </div>
              <button
                onClick={(e) =>
                  submitRejectModal(e, modalContentAppointment, rejectReason)
                }
              >
                Submit
              </button>
            </ModelContent>
          </Modal>
          <table className={helperStyles.table}>
            <thead className={helperStyles.tableHead}>
              <tr className={helperStyles.tableHeadRow}>
                <th className={helperStyles.tableHeadCell}>Date</th>
                <th className={helperStyles.tableHeadCell}>Time</th>
                <th className={helperStyles.tableHeadCell}>Status</th>
                <th className={helperStyles.tableHeadCell}>Duration</th>
                <th className={helperStyles.tableHeadCell}>Actions</th>
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
                    <PendingIcon color="orange" size={18} />
                  </td>
                  <td className={helperStyles.tableCell}>
                    {appointment.duration + " min"}
                  </td>
                  <td className={helperStyles.tableCell}>
                    <div className={styles.actions}>
                      <ApproveIcon
                        color="green"
                        size={16}
                        onClick={(e) => submitApproved(e, appointment)}
                      />
                      <RejectIcon
                        color="red"
                        size={19}
                        onClick={(e) => openRejectModal(e, appointment)}
                      />
                      {/* <RescheduleIcon color="#74808b" size={17} /> */}
                    </div>
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
