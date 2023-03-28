import { fetchFromAPI } from "../../utility/helper";
import { USER } from "../constants and cache/user";
import { ReviewModel } from "../models/review_model";
import { getPatientsByIDs } from "./patients_provider";

export const getReviews = async () => {
  // fetching from the API
  let reviews = await fetchFromAPI(`/doctors/${USER.doctor.id}/reviews`).then(
    (revs) => revs.map((rev) => new ReviewModel(rev))
  );

  // extracting patient ids
  let patientIDs = reviews.map((rev) => rev.patientID);
  patientIDs = [...new Set(patientIDs)];

  // getting patients
  let patients = await getPatientsByIDs(patientIDs);

  // merging appointment with their patients (for easy UI access)
  let patientsMap = {};
  for (let x of patients) patientsMap[x.id] = x;

  return [reviews, patientsMap];
};
