import React, { useEffect, useState } from "react";
import { getDoctorsList } from "../../../data/providers/doctors_provider";
import Loading from "../Empty/Loading";
import { DoctorsListTile } from "./DoctorsListTile";
import styles from "./doctors_list.module.css";

export const DoctorsList = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDoctorsList().then((value) => {
      setDoctorsList(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={styles.grid}>
      {isLoading ? (
        <Loading />
      ) : (
        doctorsList.map((doctor, index) => (
          <DoctorsListTile key={index} doctor={doctor} />
        ))
      )}
    </div>
  );
};
