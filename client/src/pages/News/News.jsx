import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNews } from "../../features/newsSlice";
import styles from "./News.module.css";

const News = () => {
  const news = useSelector((state) => state.newsSlice.news);
  const load = useSelector((state) => state.newsSlice.loading);
  const error = useSelector((state) => state.newsSlice.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  if (load) {
    return <div className={styles.load}>Идет загрузка...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ol className={styles.list}>
      {news.map((news) => {
        return (
          <div key={news._id} className={styles.news}>
            <div className={styles.title}>
              <Link to={`/news/${news._id}`}>{news.title}</Link>
              {news.imageURL ? (
                <img className={styles.imgnews} src={news.imageURL} alt="" />
              ) : null}
            </div>
          </div>
        );
      })}
    </ol>
  );
};

export default News;
