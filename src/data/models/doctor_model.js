export class DoctorModel {
  constructor({
    id,
    name,
    speciality,
    workingArea,
    pricePerAppointment,
    profileImageURL,
    gender,
    rating,
    email,
    phoneNumber,
  }) {
    this.id = id;
    this.name = name;
    this.speciality = speciality;
    this.workingArea = workingArea;
    this.pricePerAppointment = pricePerAppointment;
    this.profileImageURL = profileImageURL;
    this.gender = gender;
    this.rating = rating;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
