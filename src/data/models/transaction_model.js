export const TransactionTypes = {
  BASIC: "basic",
  BONUS: "bonus",
};

export class TransactionModel {
  constructor({ id, note, patientID, doctorID, type, timestamp, amount }) {
    this.id = id;
    this.note = note;
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.type = type;
    this.timestamp = timestamp;
    this.amount = amount;
  }
}
