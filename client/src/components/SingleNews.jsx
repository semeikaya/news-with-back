import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addComment,
  getComment,
  getNewsById,
  modalWindow,
  removeComment,
} from "../features/newsSlice";

const SingleNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsSlice.oneNews);
  const comments = useSelector((state) => state.newsSlice.comments);
  const [input, setInput] = useState("");
  const modal = useSelector((state) => state.newsSlice.modal);
  const token = useSelector((state) => state.authSlice.token);

  useEffect(() => {
    dispatch(getComment(id));
    dispatch(getNewsById(id));
  }, [dispatch, id]);

  if (!news || !comments) {
    return <div className="load">Идет загрузка...</div>;
  }

  function handleSubmit() {
    dispatch(addComment({ input, id }));
    setInput("");
  }

  function hadleChange(e) {
    setInput(e.target.value);
  }

  function handleModal(index) {
    dispatch(modalWindow(index));
  }

  function handleRemove(id) {
    dispatch(removeComment(id));
  }

  return (
    <>
      <div className="singlenews">
        <h1>{news.title}</h1>
        <hr />
        <p>{news.text} </p>
        <hr />
      </div>
      <div className="commentstitle">Комментарии</div>

      {token ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="block-inpt-btn"
          action=""
        >
          <input
            value={input}
            onChange={hadleChange}
            type="text"
            className="inputcomment"
            placeholder="Оставить комментарий"
          />
          <button type="submit" disabled={!input} className="send-btn">
            Send
          </button>
        </form>
      ) : (
        <div className="please-signin">
          Пожалуйста войдите в свою учетную запись, чтобы можно было оставлять
          комментарии!
        </div>
      )}
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="blockcomment">
            <div className="nicknamecomment">
              {comment.nameUser}
              <div
                className="dots"
                onClick={(e) => {
                  e.stopPropagation();
                  handleModal(comment._id);
                }}
              ></div>
            </div>
            <div className="comment">{comment.text}</div>
            {modal === comment._id ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="remove-comment-block"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(comment._id);
                  }}
                  className="remove-comment"
                >
                  Remove
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
      <div className="emptiness"></div>
    </>
  );
};

export default SingleNews;
