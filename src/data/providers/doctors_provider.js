import { doctorsData } from "../mock/mock_data";
import { sleep } from "../../utility/helper";
import { DoctorModel } from "../models/doctor_model";

export const getDoctorsList = async () => {
  // mock data
  await sleep(1000);
  return doctorsData.map((obj) => new DoctorModel(obj));
};
