import React from "react";
import styles from "./rating.module.css";
import { AiFillStar } from "react-icons/ai";

export const Rating = ({
  rating,
  maxRating = 5,
  ratingColor = "#0d47a1",
  ratingIcon,
  size = 12,
  ratingFillIcon,
}) => {
  let divs = [],
    backDivs = [];
  let icon = ratingIcon ?? <AiFillStar size={size} />;
  let count = 5;
  let activeCount = (rating / maxRating) * count;
  for (let i = 1; i <= Math.floor(activeCount); i++)
    divs.push(
      <div key={i} className={styles.active} style={{ color: ratingColor ?? "teal" }}>
        {icon}
      </div>
    );
  if (Math.floor(activeCount) !== activeCount)
    divs.push(
      <div
        key={activeCount}
        className={styles.active}
        style={{
          clipPath: `inset(0 ${
            (activeCount - Math.floor(activeCount)) * 100
          }% 0 0)`,
          color: ratingColor ?? "teal",
        }}
      >
        {icon}
      </div>
    );
  for (let i = 0; i < count; i++) backDivs.push(<div key={i}>{icon}</div>);
  return (
    <div className={styles.rating}>
      <div className={styles.front}>{divs}</div>
      <div className={styles.back}>{backDivs}</div>
    </div>
  );
};
