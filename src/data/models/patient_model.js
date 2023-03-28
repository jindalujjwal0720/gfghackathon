export class PatientModel {
  constructor({
    id,
    name,
    age,
    phoneNumber,
    gender,
    profilePicURL,
    email,
    height,
    weight,
    birthdate,
    fullAddress,
    createdAt,
  }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.profilePicURL = profilePicURL;
    this.email = email;
    this.height = height;
    this.weight = weight;
    this.birthdate = birthdate;
    this.fullAddress = fullAddress;
    this.createdAt = createdAt;
  }
}
