export class ReviewModel {
  constructor({ id, title, body, doctorID, patientID, timestamp, rating }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.patientID = patientID;
    this.doctorID = doctorID;
    this.timestamp = timestamp;
    this.rating = rating;
  }
}
