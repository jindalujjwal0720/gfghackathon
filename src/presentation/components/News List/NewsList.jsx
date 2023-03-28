import React, { useState, useEffect } from "react";
import { getNewsList } from "../../../data/providers/news_provider";
import { Loading } from "../Loading";
import { NewsListTile } from "./NewsListTile";
import styles from "./news_list.module.css";

export const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewsList().then((value) => {
      setNewsList(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={styles.grid}>
      {isLoading ? (
        <Loading />
      ) : (
        newsList.map((news, index) => <NewsListTile key={index} news={news} />)
      )}
    </div>
  );
};
