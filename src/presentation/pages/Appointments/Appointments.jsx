import React, { useEffect, useState } from "react";
import { USER } from "../../../data/constants and cache/user";
import { getAllAppointments } from "../../../data/providers/appointments_provider";
import { getDate } from "../../../utility/helper";
import { Loading } from "../Empty/Loading";
import styles from "./appointments.module.css";
import { AppointmentsTimeline } from "./AppointmentsTimeline";

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientsMap, setPatientsMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllAppointments(USER.doctor.id).then(([appointments, patientsMap]) => {
      appointments.sort((a, b) => a.startTime - b.startTime);
      setAppointments(groupByDates(appointments));
      setPatientsMap(patientsMap);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className={styles.listHeading}>Appointments</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <AppointmentsTimeline
          appointments={appointments}
          patientsMap={patientsMap}
        />
      )}
    </div>
  );
};

const groupByDates = (appointments) => {
  let resultObject = {};
  appointments.forEach((element) => {
    let key = getDate(element.startTime);
    if (resultObject.hasOwnProperty(key)) {
      resultObject[key].push(element);
    } else {
      resultObject[key] = [element];
    }
  });
  let result = [];
  for (let key of Object.keys(resultObject)) {
    result.push([key, resultObject[key]]);
  }
  result.sort((a, b) => a[1].startTime - b[1].startTime);
  return result;
};
