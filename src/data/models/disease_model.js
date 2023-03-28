export class DiseaseModel {
  constructor({ id, name, symptoms, treatmentIDs }) {
    this.id = id;
    this.name = name;
    this.symptoms = symptoms;
    this.treatmentIDs = treatmentIDs;
  }
}
