import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getNewByCategory } from "../../features/newsSlice";
import styles from "./CategoryNews.module.css";

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsSlice.newsByCategory);
  const load = useSelector((state) => state.newsSlice.loading);
  const error = useSelector((state) => state.newsSlice.error);
  const category = useSelector((state) =>
    state.newsSlice.category.filter((item) => {
      return item._id === id;
    })
  );

  useEffect(() => {
    dispatch(getNewByCategory(id));
  }, [dispatch, id]);

  if (load) {
    return <div className={styles.load}>Идет загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ol className={styles.list}>
      {/* <div className="headcategory">{category.name}</div> */}

      {category.map((item) => (
        <div className={styles.headCategory}>{item.name}</div>
      ))}

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

export default Category;
