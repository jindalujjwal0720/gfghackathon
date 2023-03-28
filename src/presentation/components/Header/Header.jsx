import React, { useState } from "react";
import styles from "./header.module.css";
import { IoSearch } from "react-icons/io5";
import {
  MdNotificationsNone,
  MdKeyboardArrowDown,
  MdLogout,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { USER } from "../../../data/constants and cache/user";

export const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleIsMenuVisible = () => setIsMenuVisible(!isMenuVisible);
  const logout = () => {
    console.count("Logged Out");
    toggleIsMenuVisible();
  };

  return (
    <div className={styles.header}>
      <form className={styles.searchForm}>
        <input
          type="search"
          className={styles.searchBar}
          placeholder="Search"
          id="global-search"
        ></input>
        <label for="global-search" className={styles.searchIcon}>
          <IoSearch />
        </label>
      </form>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.notifications}>
          <MdNotificationsNone size={20} />
        </div>
        <div className={styles.profileCard}>
          <img
            src={USER.doctor.profileImageURL}
            className={styles.profileImage}
            alt="dp"
          ></img>
          <div style={{ margin: 0, marginRight: "16px" }}>
            <p className={styles.profileCardName}>{USER.doctor.name}</p>
            <p className={styles.profileCardSpeciality}>
              {USER.doctor.speciality}
            </p>
          </div>
          {isMenuVisible ? (
            <MdKeyboardArrowDown
              size={24}
              style={{ transform: "rotate(90deg)" }}
              onClick={toggleIsMenuVisible}
            />
          ) : (
            <MdKeyboardArrowDown size={24} onClick={toggleIsMenuVisible} />
          )}
          <div
            className={
              isMenuVisible ? `${styles.menu} ${styles.visible}` : styles.menu
            }
          >
            <Link to="/" style={{ textDecoration: "none" }} onClick={logout}>
              <div className={styles.menuItem}>
                <MdLogout />
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
