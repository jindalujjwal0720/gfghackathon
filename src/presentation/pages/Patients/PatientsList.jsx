import React, { useState } from "react";
import { PatientListTile } from "./PatientListTile";
import styles from "./patients.module.css";

export const PatientsList = ({ patients }) => {
  const [activeGenderIndex, setActiveGenderIndex] = useState(0);
  const patientsSortedList = getSortedAlphabeticalList(patients);
  const [patientsList, setPatientsList] = useState(patientsSortedList);
  const [anchors, setAnchors] = useState(
    patientsSortedList.filter((e) => e[1].length > 0).map((e) => e[0])
  );

  function getGenderClasses(index) {
    return `${styles.genderTab} ${
      activeGenderIndex === index ? styles.genderTabActive : ""
    }`;
  }

  function changeActiveGenderIndex(index) {
    setActiveGenderIndex(index);
    if (index === 2) {
      let list = [];
      patientsSortedList.forEach((element) => {
        list.push([
          element[0],
          element[1].filter((patient) => patient.gender === "Male"),
        ]);
      });
      setPatientsList(list);
      setAnchors([...list.filter((e) => e[1].length > 0).map((e) => e[0])]);
    } else if (index === 1) {
      let list = [];
      patientsSortedList.forEach((element) => {
        list.push([
          element[0],
          element[1].filter((patient) => patient.gender === "Female"),
        ]);
      });
      setPatientsList(list);
      setAnchors([...list.filter((e) => e[1].length > 0).map((e) => e[0])]);
    } else {
      setPatientsList(patientsSortedList);
      setAnchors([
        ...patientsSortedList.filter((e) => e[1].length > 0).map((e) => e[0]),
      ]);
    }
  }

  function isAnchorEnabled(c) {
    return anchors.includes(c);
  }

  return (
    <div className={styles.patientsList}>
      <div className={styles.genderTabBar}>
        <div
          className={getGenderClasses(0)}
          onClick={() => changeActiveGenderIndex(0)}
        >
          All
        </div>
        <div
          className={getGenderClasses(1)}
          onClick={() => changeActiveGenderIndex(1)}
        >
          Women
        </div>
        <div
          className={getGenderClasses(2)}
          onClick={() => changeActiveGenderIndex(2)}
        >
          Men
        </div>
      </div>
      <div className={styles.anchorBar}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) =>
          isAnchorEnabled(c) ? (
            <a href={`#${c}`} className={styles.anchorEnabled}>
              {c}
            </a>
          ) : (
            <a href={`#${c}`} className={styles.anchorDisabled}>
              {c}
            </a>
          )
        )}
      </div>
      {patientsList.map((category) => {
        if (category[1].length > 0) {
          return (
            <div className={styles.category} id={category[0]}>
              <div className={styles.separator}>
                <span>{category[0]}</span>
              </div>
              {category[1].map((patient) => (
                <PatientListTile patient={patient} />
              ))}
            </div>
          );
        }
        return "";
      })}
    </div>
  );
};

const getSortedAlphabeticalList = (patients) => {
  let resultObject = {};
  patients.forEach((patient) => {
    if (resultObject.hasOwnProperty(patient.name[0])) {
      resultObject[patient.name[0]].push(patient);
    } else {
      resultObject[patient.name[0]] = [patient];
    }
  });
  let result = [];
  for (let c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    if (resultObject.hasOwnProperty(c)) {
      result.push([c, resultObject[c]]);
    }
  }
  return result;
};
