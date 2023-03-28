import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCalendar, HiOutlineStar } from "react-icons/hi";
import { MdPeopleOutline } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { BiWallet } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import fullLogo from "./../../../assets/images/medoi-logo.png";

export const SideBar = ({ backgroundColor }) => {
  const lastSavedActiveIndexString = sessionStorage.getItem(
    "lastSavedActiveIndex"
  );
  const lastSavedActiveIndex = Number(lastSavedActiveIndexString);
  console.log(lastSavedActiveIndex);
  const [activeIndex, setActiveIndex] = useState(lastSavedActiveIndex || 0);

  const changeActiveIndex = (newIndex) => {
    sessionStorage.setItem("lastSavedActiveIndex", newIndex);
    setActiveIndex(newIndex);
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard size={18} />,
      route: "/",
    },
    {
      name: "Appointments",
      icon: <HiOutlineCalendar />,
      route: "/appointments",
    },
    {
      name: "Patients",
      icon: <MdPeopleOutline size={20} />,
      route: "/patients",
    },
    {
      name: "Messages",
      icon: <IoChatboxOutline />,
      route: "/messages",
    },
    {
      name: "Reviews",
      icon: <HiOutlineStar />,
      route: "/reviews",
    },
    {
      name: "Finances",
      icon: <BiWallet />,
      route: "/finances",
    },
    {
      name: "Settings",
      icon: <VscSettings />,
      route: "/settings",
    },
  ];

  return (
    <div
      className={styles.sidebar}
      style={{ backgroundColor: backgroundColor }}
    >
      <div>
        <div className={styles.sidebarTitle}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={fullLogo} alt="logo" />
          </Link>
        </div>

        <div className={styles.sidebarSubTitle}></div>

        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.route}
            style={{ textDecoration: "none" }}
            onClick={() => changeActiveIndex(index)}
          >
            <div className={styles.sidebarItem}>
              <span
                className={`${styles.icon} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                {item.icon}
              </span>
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.sidebarTail}></div>
    </div>
  );
};
