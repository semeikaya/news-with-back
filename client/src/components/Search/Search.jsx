import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autocompleteNews } from "../../features/newsSlice";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsSlice.autocompleteNews);

  useEffect(() => {
    dispatch(autocompleteNews(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className={styles.inputBox}>
      <svg
        className={styles.icon}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Поиск новостей"
        type="text"
      />
      {news ? (
        <ul className={styles.autocomplete}>
          {searchValue
            ? news.map((item) => {
                return (
                  <li
                    onClick={() => setSearchValue("")}
                    className={styles.autocomplete_box}
                    key={item._id}
                  >
                    <Link
                      className={styles.autocomplete_item}
                      to={`/news/${item._id}`}
                    >
                      {item.title.slice(0, 21) + "..."}
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
      ) : null}
      <Link className={styles.logout} to={`/news/search/${searchValue}`}>
        S
      </Link>
    </div>
  );
};

export default Search;
