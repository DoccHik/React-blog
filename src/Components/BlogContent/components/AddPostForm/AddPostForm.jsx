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

  // Создаем новый пост
  createNewPost = (e) => {
    // e.pereventDefault();
    const post = {
      id: this.props.blogArr.length + 1,
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: false,
    };

    this.props.addNewBlogPost(post);
    // console.log(post);

    // Закрываем форму
    this.props.hideAddPostForm();
  };

  // todo Содаем пост по клику на клавишу Enter

  handleEnter = (e) => {
    if (e.key === "Enter" && this.props.showAddPostForm) {
      this.createNewPost();
      console.log("Вы нажали на Enter");
    }
  };

  // todo Создаем событие Enter для создания поста
  componentDidMount() {
    window.addEventListener("Enter", this.handleEnter);
  }

  render() {
    const hideAddPostForm = this.props.hideAddPostForm;
    return (
      <>
        <div className="overlay">
          <button onClick={hideAddPostForm} className="overlay-close__btn">
            <CloseRoundedIcon />
          </button>
          <form onSubmit={this.createNewPost} className="add-post-form">
            <h2 className="add-post__heading">Новый пост</h2>
            <div>
              <input
                className="add-post-title"
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
                className="add-post-description"
                name="postDescription"
                placeholder="Напишите текст"
                value={this.state.postDescription}
                onChange={this.handlePostDescriptionChange}
                required
              />
            </div>
            <div>
              <button className="add-post-btn" type="submit">
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

// todo
/*  
  1 - Написать функцию, кторая будет создавать пост по клику на клавшу Enter. Так же удалить собития 
  2 - Изменить функцию лайков на коллбек как на примере addNewBlogPost
*/
