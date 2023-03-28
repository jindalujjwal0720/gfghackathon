export const AppointmentStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected", // by doctor
  CANCELLED: "cancelled", // by patient
  RE_SCHEDULED: "re_scheduled",
  COMPLETED: "completed",
};

export class AppointmentModel {
  constructor({
    id,
    duration,
    startTime,
    status,
    doctorID,
    patientID,
    symptoms,
  }) {
    this.id = id;
    this.duration = duration;
    this.startTime = startTime;
    this.status = status;
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.symptoms = symptoms;
  }
}
