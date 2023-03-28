import React, { useEffect, useState } from "react";
import { getPatientsByDoctorID } from "../../../data/providers/patients_provider";
import { Loading } from "../Empty/Loading";
import { PatientsList } from "./PatientsList";
import styles from "./patients.module.css";
import { USER } from "../../../data/constants and cache/user";

export const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPatientsByDoctorID(USER.doctor.id).then((data) => {
      setPatients(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className={styles.listHeading}>Patients</h1>
      {isLoading ? <Loading /> : <PatientsList patients={patients} />}
    </div>
  );
};
