import { fetchFromAPI } from "../../utility/helper";
import { USER } from "../constants and cache/user";
import { TransactionModel } from "../models/transaction_model";
import { getPatientsByIDs } from "./patients_provider";

export const getTransactions = async () => {
  // fetching from the API
  let transactions = await fetchFromAPI(
    `/doctors/transactions/${USER.doctor.id}`
  ).then((trans) => trans.map((tran) => new TransactionModel(tran)));
  console.log(transactions);
  // extracting patient ids
  let patientIDs = transactions.map((tran) => tran.patientID);
  patientIDs = [...new Set(patientIDs)];

  // getting patients
  let patients = await getPatientsByIDs(patientIDs);

  // merging appointment with their patients (for easy UI access)
  let patientsMap = {};
  for (let x of patients) patientsMap[x.id] = x;

  return [transactions, patientsMap];
};
