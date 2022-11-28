import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNewsById } from "../features/newsSlice";

const SingleNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsSlice.oneNews);

  useEffect(() => {
    dispatch(getNewsById(id));
  }, [dispatch, id]);

  if (!news) {
    return <div className="load">Идет загрузка...</div>;
  }

  return (
    <div className="singlenews">
      <h1>{news.title}</h1>
      <hr />
      <p>{news.text} </p>
    </div>
  );
};

export default SingleNews;
