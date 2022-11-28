import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNews } from "../features/newsSlice";

const News = () => {
  const news = useSelector((state) => state.newsSlice.news);
  const load = useSelector((state) => state.newsSlice.loading);
  const error = useSelector((state) => state.newsSlice.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  console.log(load);

  if (load) {
    return <div className="load">Идет загрузка...</div>;
  }
  if (error) {
    return <div className="load">{error}</div>;
  }

  return (
    <ol>
      {news.map((news) => {
        return (
          <div key={news._id} className="news">
            <div className="title">
              <Link to={`/news/${news._id}`}>{news.title}</Link>
              {news.imageURL ? (
                <img className="imgnews" src={news.imageURL} alt="" />
              ) : null}
            </div>
          </div>
        );
      })}
    </ol>
  );
};

export default News;
