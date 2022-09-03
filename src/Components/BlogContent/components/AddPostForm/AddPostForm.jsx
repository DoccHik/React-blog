import React from "react";

import "../AddPostForm/AddPostForm.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
class AddPostForm extends React.Component {
  state = {
    postTitle: "",
    postDescription: "",
  };

  handlePostTitleChange = (e) => {
    // перехватываем значение в inputTitle через event.target.value
    this.setState({
      // Добавляем значения в inputTitle.value
      postTitle: e.target.value,
    });
  };

  handlePostDescriptionChange = (e) => {
    // перехватываем значение в inputDescription через event.target.value
    this.setState({
      // Добавляем значения в inputDescription.value
      postDescription: e.target.value,
    });
  };
  render() {
    const hideAddPostForm = this.props.hideAddPostForm;
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
                value={this.state.postTitle}
                onChange={this.handlePostTitleChange}
              />
            </div>
            <div>
              <textarea
                className="add-post-description"
                name="postDescription"
                placeholder="Напишите текст"
                value={this.state.postDescription}
                onChange={this.handlePostDescriptionChange}
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
  }
}

export default AddPostForm;
