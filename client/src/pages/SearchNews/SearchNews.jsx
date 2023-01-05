import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getNewBySearch } from "../../features/newsSlice";
import styles from "./SearchNews.module.css";

const SearchNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsSlice.newsByCategory);
  const load = useSelector((state) => state.newsSlice.loading);
  const error = useSelector((state) => state.newsSlice.error);
  

  useEffect(() => {
    dispatch(getNewBySearch(id));
  }, [dispatch, id]);

if (id === '') {
  return <div className={styles.error}>Пустота</div>;
}


  if (load) {
    return <div className={styles.load}>Идет загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ol className={styles.list}>
      <hr />
      {news.map((news) => {
        return (
          <div key={news._id} className={styles.news}>
            <div className={styles.title}>
              <Link to={`/news/${news._id}`}>{news.title}</Link>
            </div>
          </div>
        );
      })}
    </ol>
  );
};

export default SearchNews;
