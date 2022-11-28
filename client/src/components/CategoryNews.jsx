import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getNewByCategory } from "../features/newsSlice";

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
    return <div className="load">Идет загрузка...</div>;
  }

  if (error) {
    return <div className="load">{error}</div>;
  }

  return (
    <ol>
      {/* <div className="headcategory">{category.name}</div> */}

      {category.map((item) => (
        <div className="headcategory">{item.name}</div>
      ))}

      <hr />
      {news.map((news) => {
        return (
          <div key={news._id} className="news">
            <div className="title">
              <Link to={`/news/${news._id}`}>{news.title}</Link>
            </div>
          </div>
        );
      })}
    </ol>
  );
};

export default Category;
