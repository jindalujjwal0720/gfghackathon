import React from "react";
import { AppointmentsList } from "../components/Appointments/AppointmentsList";
import { PendingAppointmentsList } from "../components/Appointments/PendingAppointmentsList";
// import { DoctorsList } from "../components/Doctors List/DoctorsList";
// import { NewsList } from "../components/News List/NewsList";

export const TempPage = () => {
  return (
    <div>
      {/* <DoctorsList /> */}
      {/* <NewsList /> */}
      <AppointmentsList />
      <PendingAppointmentsList />
    </div>
  );
};
