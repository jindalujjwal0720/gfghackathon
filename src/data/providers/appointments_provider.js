import { fetchFromAPI, sleep } from "../../utility/helper";
import { AppointmentModel } from "../models/appointment_model";
import { getPatientsByIDs } from "./patients_provider";

// returns the appointments data as well as the patient info of that appointment
export const getAllAppointments = async (doctorID) => {
  // fetching appointments from API
  let appointments = await fetchFromAPI(`/appointments/${doctorID}`).then(
    (data) => data.map((object) => new AppointmentModel(object))
  );
  // extracting patientIDs from appointments
  let patientIDs = appointments.map((appointment) => appointment.patientID);
  patientIDs = [...new Set(patientIDs)];

  // getting patients
  let patients = await getPatientsByIDs(patientIDs);

  // merging appointment with their patients (for easy UI access)
  let patientsMap = {};
  for (let x of patients) patientsMap[x.id] = x;

  return [appointments, patientsMap];
};

export const approvePendingAppointment = async (appointmentID) => {
  // mock
  await sleep(1000);
  return;
};

export const rejectPendingAppointment = async (appointmentID, reason) => {
  // mock
  await sleep(1000);
  return;
};
