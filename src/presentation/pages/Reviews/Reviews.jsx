import React, { useEffect, useState } from "react";
import { getReviews } from "../../../data/providers/reviews_provider";
import { Loading } from "./../Empty/Loading";
import { Rating } from "../../components/helper/Rating";
import styles from "./reviews.module.css";
import { getDate, getTime } from "../../../utility/helper";
import { CgLoadbar } from "react-icons/cg";
import { USER } from "../../../data/constants and cache/user";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [patientsMap, setPatientsMap] = useState({});
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews().then(([revs, patsMap]) => {
      let sumOfRatings = 0;
      revs.forEach((rev) => {
        sumOfRatings += Number(rev.rating);
      });
      setRating(sumOfRatings / revs.length);
      setReviews(revs);
      setPatientsMap(patsMap);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Reviews</h1>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.reviewsContainer}>
            <div className={styles.reviewsContainerHeader}>
              <img
                src={USER.doctor.profileImageURL}
                alt="dp"
                className={styles.headerDoctorImage}
              ></img>
              <div>
                <p className={styles.doctorName}>{USER.doctor.name}</p>
                <p className={styles.doctorOverallRating}>
                  {rating.toPrecision(2)}
                </p>
                <Rating
                  rating={rating}
                  ratingColor={"green"}
                  ratingIcon={<CgLoadbar />}
                />
              </div>
            </div>
            {reviews.map((review) => (
              <div className={styles.reviewTile}>
                <div className={styles.reviewHeader}>
                  <img
                    src={patientsMap[review.patientID].profilePicURL}
                    alt="dp"
                    className={styles.reviewPatientProfileImage}
                  ></img>
                  <div>
                    <p className={styles.reviewTitle}>{review.title}</p>
                    <p className={styles.reviewPatientName}>
                      {patientsMap[review.patientID].name}
                    </p>
                  </div>
                </div>
                <div className={styles.reviewBody}>
                  <p className={styles.reviewBodyContent}>{review.body}</p>
                  <p className={styles.reviewDate}>
                    <span>
                      {getDate(review.timestamp)} - {getTime(review.timestamp)}
                    </span>
                  </p>
                  <Rating
                    rating={review.rating}
                    ratingColor={"green"}
                    ratingIcon={<CgLoadbar />}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
