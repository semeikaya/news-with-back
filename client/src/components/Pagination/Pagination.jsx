import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Pagination.module.css";
const Pagination = ({ id }) => {
  const pages = useSelector((state) => state.newsSlice.pages);

  return (
    <div className={styles.numPage}>
      {pages.map((item) => {
        console.log(id);
        return (
          <div>
            <Link
              className={
                item === Number(id)
                  ? styles.disabled_link
                  : styles.enable_link
              }
              to={`/news/page/${item}`}
              disabled={true}
            >
              {item}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
