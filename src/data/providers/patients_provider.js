import { fetchFromAPI } from "../../utility/helper";
import { PatientModel } from "../models/patient_model";

export const getPatientsByDoctorID = async (doctorID) => {
  return fetch(
    `${process.env.REACT_APP_API_BASE_URL}/patients/${doctorID}`
  ).then((res) => res.json());
};

export const getPatientsByIDs = async (patientIDs) => {
  // returning the patient with ids given
  return await fetchFromAPI("/patients", {
    ids: patientIDs,
  }).then((data) => data.map((object) => new PatientModel(object)));
};
