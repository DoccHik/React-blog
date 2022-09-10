import React from "react";

import "../components/BlogCard.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  openEditPostForm,
  handleSelectedPost,
}) => {
  const showEditForm = () => {
    handleSelectedPost();
    openEditPostForm();
  };

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
            <div>
              <button onClick={showEditForm} className="post-edit__btn">
                <ModeEditOutlineOutlinedIcon />
              </button>
              <button onClick={deletePost} className="post-del__btn">
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
