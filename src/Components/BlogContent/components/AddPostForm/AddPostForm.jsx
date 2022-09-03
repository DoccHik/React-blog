import React from "react";

import "../AddPostForm/AddPostForm.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const AddPostForm = ({ hideAddPostForm }) => {
  return (
    <>
      <div className="overlay">
        <button onClick={hideAddPostForm} className="overlay-close__btn">
          <CloseRoundedIcon />
        </button>
        <form action="" className="add-post-form">
          <h2 className="add-post__heading">Новый пост</h2>
          <div>
            <input
              className="add-post-title"
              type="text"
              name="postTitle"
              placeholder="Напишите название"
            />
          </div>
          <div>
            <textarea
              className="add-post-description"
              name="postDescription"
              placeholder="Напишите текст"
            />
          </div>
          <div>
            <button className="add-post-btn" type="button">
              Опубликовать пост
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPostForm;

// ! https://youtu.be/czPUlOI5kwU
