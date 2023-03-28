import React from "react";
import styles from "./settings.module.css";
import { BiImageAlt } from "react-icons/bi";
import { USER } from "../../../data/constants and cache/user";

export const Settings = () => {
  const savePersonalInformation = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className={styles.heading}>Settings</h1>
      <div className={styles.personalInformationContainer}>
        <h2 className={styles.subheading}>Personal Information</h2>
        <form className={styles.personalInformationForm} action="none">
          <div>
            <label
              htmlFor="image-input-hidden-picker"
              className={styles.pickImage}
              style={
                USER.doctor.profileImageURL
                  ? {
                      background: `radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(97,117,134,0.7904411764705882) 100%), url(${USER.doctor.profileImageURL})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      color: "#fff",
                    }
                  : {}
              }
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{
                  display: "none",
                }}
                id="image-input-hidden-picker"
              ></input>
              <BiImageAlt size={24} />
              <p>Pick an image here</p>
            </label>
          </div>
          <div className={styles.personalInformationFormInputs}>
            <div>
              <label
                htmlFor="full-name"
                className={styles.personalInformationFormLabel}
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                placeholder="Full Name"
                defaultValue={USER.doctor.name}
                className={styles.personalInformationFormInput}
              ></input>
            </div>
            <div>
              <label
                htmlFor="email"
                className={styles.personalInformationFormLabel}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="medoi@medoi.com"
                defaultValue={USER.doctor.email}
                className={styles.personalInformationFormInput}
              ></input>
            </div>
            <div>
              <label
                htmlFor="phone"
                className={styles.personalInformationFormLabel}
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                defaultValue={USER.doctor.phoneNumber}
                className={styles.personalInformationFormInput}
              ></input>
            </div>
            <div>
              <label
                htmlFor="speciality"
                className={styles.personalInformationFormLabel}
              >
                Speciality
              </label>
              <input
                type="text"
                id="speciality"
                placeholder="Speciality"
                defaultValue={USER.doctor.speciality}
                className={styles.personalInformationFormInput}
              ></input>
            </div>
            <div>
              <label
                htmlFor="working-area"
                className={styles.personalInformationFormLabel}
              >
                Working Area
              </label>
              <input
                type="text"
                id="working-area"
                placeholder="Working Area"
                defaultValue={USER.doctor.workingArea}
                className={styles.personalInformationFormInput}
              ></input>
            </div>

            <div>
              <label className={styles.personalInformationFormLabel}>
                Gender
              </label>
              <label
                htmlFor="male"
                className={styles.personalInformationFormRadioLabel}
              >
                Male
              </label>
              <input
                type="radio"
                id="male"
                name="gender"
                placeholder="gender"
                value="Male"
                defaultChecked={USER.doctor.gender === "Male"}
                className={styles.personalInformationFormRadioInput}
              ></input>
              <label
                htmlFor="female"
                className={styles.personalInformationFormRadioLabel}
              >
                Female
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                placeholder="gender"
                value="Female"
                defaultChecked={USER.doctor.gender === "Female"}
                className={styles.personalInformationFormRadioInput}
              ></input>
            </div>
            <div>
              <label
                htmlFor="price-per-appointment"
                className={styles.personalInformationFormLabel}
              >
                Price Per Appointment (₹)
              </label>
              <input
                type="text"
                id="price-per-appointment"
                placeholder="₹ 100"
                defaultValue={USER.doctor.pricePerAppointment}
                className={styles.personalInformationFormInput}
              ></input>
            </div>
            <div>
              <label
                htmlFor="birthdate"
                className={styles.personalInformationFormLabel}
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthdate"
                placeholder="mm/dd/yyyy"
                defaultValue={new Date(
                  Number(USER.doctor.birthdate)
                ).toLocaleDateString("en-CA")}
                className={styles.personalInformationFormInput}
              ></input>
            </div>
          </div>
          <div></div>
          <button
            className={styles.personalInformationFormSaveButton}
            onClick={savePersonalInformation}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};
