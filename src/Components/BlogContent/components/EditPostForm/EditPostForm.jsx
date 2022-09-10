import React from "react";

import "../EditPostForm/EditPostForm.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
class EditPostForm extends React.Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDescription: this.props.selectedPost.description,
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

  savePost = (e) => {
    e.preventDefault();

    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: this.props.selectedPost.liked,
    };

    this.props.editBlogPost(post);

    this.props.hideEditPostForm();
  };

  handleEnter = (e) => {
    if (e.key === "Enter" && this.props.showAddPostForm) {
      this.createNewPost();
      console.log("Вы нажали на Enter");
    }
  };

  handleEscape = (e) => {
    if (e.key === "Escape") {
      this.props.hideEditPostForm();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const hideEditPostForm = this.props.hideEditPostForm;
    return (
      <>
        <div className="overlay">
          <button onClick={hideEditPostForm} className="overlay-close__btn">
            <CloseRoundedIcon />
          </button>
          <form onSubmit={this.savePost} className="edit-post-form">
            <h2 className="edit-post__heading">Изменить пост</h2>
            <div>
              <input
                className="edit-post-title"
                type="text"
                name="postTitle"
                placeholder="Напишите название"
                value={this.state.postTitle}
                onChange={this.handlePostTitleChange}
                required
              />
            </div>
            <div>
              <textarea
                className="edit-post-description"
                name="postDescription"
                placeholder="Напишите текст"
                value={this.state.postDescription}
                onChange={this.handlePostDescriptionChange}
                required
              />
            </div>
            <div>
              <button
                onClick={this.props.saveEditPost}
                className="edit-post-btn"
                type="submit"
              >
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default EditPostForm;

// todo
/*  
  1 - Написать функцию, кторая будет создавать пост по клику на клавшу Enter. Так же удалить собития 
  2 - Изменить функцию лайков на коллбек как на примере addNewBlogPost
*/
