import React from "react";

import "../components/BlogCard.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

const BlogCard = ({ title, description, liked, likePost, deletePost }) => {
  const heartFill = liked ? "crimson" : "gray";

  return (
    <>
      <div className="post">
        <div className="post-content">
          <h2 className="title">{title}</h2>
          <p className="post-description">{description}</p>{" "}
          <div className="post-buttons">
            <button onClick={likePost}>
              <FavoriteIcon style={{ fill: heartFill }} />
            </button>
          </div>
        </div>
        <button onClick={deletePost} className="post-del__btn">
          <DeleteIcon />
        </button>
      </div>
    </>
  );
};

export default BlogCard;
