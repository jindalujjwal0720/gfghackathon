import React, { useEffect } from "react";
import styles from "./modal.module.css";
import { MdClose as CloseIcon } from "react-icons/md";

export const Modal = ({ show, onClose, children, backgroundOpacity = 0.1 }) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div
      className={styles.modal}
      style={{
        display: show ? "flex" : "none",
        backgroundColor: `rgba(40, 51, 62, ${backgroundOpacity})`,
      }}
    >
      {children}
    </div>
  );
};

export const ModelContent = ({ children, onClose }) => {
  return (
    <div className={styles.modalContentWrapper}>
      <CloseIcon
        className={styles.modalContentCloseIcon}
        onClick={onClose}
        size={16}
      />
      <div className={styles.modelContentBody}>{children}</div>
    </div>
  );
};
