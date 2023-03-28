// type represents [SELF, CLINIC]

export class TreatmentModel {
  constructor({
    id,
    name,
    price,
    doctorID,
    decription,
    diseaseID,
    type,
    durationInDays,
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.doctorID = doctorID;
    this.description = decription;
    this.diseaseID = diseaseID;
    this.durationInDays = durationInDays;
  }
}
