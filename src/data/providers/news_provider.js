import { sleep } from "../../utility/helper";
import { newsData } from "../mock/mock_data";
import { NewsModel } from "../models/news_model";

export const getNewsList = async () => {
  // returning mock news
  await sleep(1000);
  return newsData.articles.map((e) => new NewsModel(e));
};
