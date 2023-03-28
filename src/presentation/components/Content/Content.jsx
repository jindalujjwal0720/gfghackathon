import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { Appointments } from "../../pages/Appointments/Appointments";
import { Patients } from "../../pages/Patients/Patients";
import { Messages } from "../../pages/Messages/Messages";
import { Reviews } from "../../pages/Reviews/Reviews";
import { Finances } from "../../pages/Finances/Finances";
import { Settings } from "../../pages/Settings/Settings";

export const Content = () => {
  return (
    <div style={{ margin: "0px 40px" }}>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/Patients" element={<Patients />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Finances" element={<Finances />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
