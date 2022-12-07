import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategory } from "../../features/newsSlice";
import styles from './Header.module.css'

const Header = () => {
  const categories = useSelector((state) => state.newsSlice.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <header className={styles.head}>
      <nav className={styles.headnav}>
        <Link className={styles.homeBtn} to="/news">
          HOME
        </Link>
        <hr />
        <div>CATEGORY</div>
        {categories.map((category) => {
          return (
            <div key={category._id} className={styles.categoryBtn}>
              <Link to={`/news/category/${category._id}`}>{category.name}</Link>
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
