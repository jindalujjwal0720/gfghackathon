class User {
  constructor({ doctor }) {
    this.doctor = doctor;
  }
}

// initialising app with mock data
export var USER = new User({
  doctor: {
    id: 3,
    name: "Arman Woolmington",
    speciality: "Radiologist",
    workingArea: "General Injectables & Vaccines, Inc",
    pricePerAppointment: 231,
    profileImageURL: "https://source.unsplash.com/random/600x600/?doctor",
    gender: "Male",
    rating: 4.7,
    email: "awoolmington2@tinyurl.com",
    phoneNumber: "617 291 1821",
    birthdate: "1674530115000",
  },
});
