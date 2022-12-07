import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getNewsById,
} from "../../features/newsSlice";

import {
  addComment,
  getComment,
  modalWindow,
  removeComment,
} from "../../features/commentsSlice";

import styles from "./SingleNews.module.css";

const SingleNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.newsSlice.oneNews);
  const comments = useSelector((state) => state.commentsSlice.comments);
  const [input, setInput] = useState("");
  const modal = useSelector((state) => state.commentsSlice.modal);
  const token = useSelector((state) => state.authSlice.token);

  useEffect(() => {
    dispatch(getComment(id));
    dispatch(getNewsById(id));
  }, [dispatch, id]);

  if (!news || !comments) {
    return <div className={styles.load}>Идет загрузка...</div>;
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
      <div className={styles.singleNews}>
        <h1>{news.title}</h1>
        <hr />
        <p>{news.text} </p>
        <hr />
      </div>
      <div className={styles.commentsTitle}>Комментарии</div>

      {token ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={styles.blockInptBtn}
          action=""
        >
          <input
            value={input}
            onChange={hadleChange}
            type="text"
            className={styles.inputComment}
            placeholder="Оставить комментарий"
          />
          <button type="submit" disabled={!input} className={styles.sendBtn}>
            Send
          </button>
        </form>
      ) : (
        <div className={styles.pleaseSignin}>
          Пожалуйста войдите в свою учетную запись, чтобы можно было оставлять
          комментарии!
        </div>
      )}
      {comments.map((comment) => {
        return (
          <div key={comment._id} className={styles.blockComment}>
            <div className={styles.nicknameComment}>
              {comment.nameUser}
              <div
                className={styles.dots}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModal(comment._id);
                }}
              ></div>
            </div>
            <div className={styles.comment}>{comment.text}</div>
            {modal === comment._id ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={styles.removeCommentBlock}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(comment._id);
                  }}
                  className={styles.removeComment}
                >
                  Remove
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
      <div className={styles.emptiness}></div>
    </>
  );
};

export default SingleNews;
