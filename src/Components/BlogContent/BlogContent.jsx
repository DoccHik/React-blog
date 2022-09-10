import axios from "axios";
import React from "react";
// import { posts } from "../../shared/ProjectData";

import "../BlogContent/BlogContent.css";
import AddPostForm from "./components/AddPostForm/AddPostForm";
import BlogCard from "./components/BlogCard";

import CircularProgress from "@mui/material/CircularProgress";
import EditPostForm from "./components/EditPostForm/EditPostForm";
import { resolveComponentProps } from "@mui/base";

class BlogContent extends React.Component {
  // состояния
  state = {
    showAddPostForm: false,
    showEditPostForm: false,
    // showBlog: true,
    blogArr: [],
    isPending: true,
    selectedPost: {},
  };

  fetchPost = () => {
    /* this.setState({
      isPending: true,
    }); */
    // Делаем запрос на получение данных(посты)
    axios
      .get("https://6314786cfc9dc45cb4ee0081.mockapi.io/posts")
      .then((response) => {
        // console.log(response);

        // Добавляем данные в состояние
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  likePost = (blogPost) => {
    // console.log(blogPost);
    const temp = { ...blogPost };
    // console.log("temp => ", temp);
    temp.liked = !temp.liked;
    axios
      .put(
        `https://6314786cfc9dc45cb4ee0081.mockapi.io/posts/${blogPost.id}`,
        temp
      )
      .then((response) => {
        console.log("Пост измненен => ", response.data);
        this.fetchPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Удаление постов
  deletePost = (blogPost) => {
    if (window.confirm(`Вы точно хотите удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      axios
        .delete(
          `https://6314786cfc9dc45cb4ee0081.mockapi.io/posts/${blogPost.id}`
        )
        .then((response) => {
          console.log(`Пост удален => ${response.data}`);
          this.fetchPost();
        })
        .catch((err) => {
          console.log(err);
        });

      // Копия массива через spread(...) и присваивание в переменную temp
      // const temp = [...this.state.blogArr];
      // temp.splice(pos, 1);
      // console.log("Эталонный массив =>", this.state.blogArr);
      // console.log("Временный массив =>", temp);

      // Присваивание временного массива в исходное состояние
      // this.setState({
      //   blogArr: temp,
      // });
      // localStorage.setItem("blogPosts", JSON.stringify(temp));
    }
  };

  // Добавляем новый пост в массив
  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    // Добавляем новый пост на сервер
    axios
      .post("https://6314786cfc9dc45cb4ee0081.mockapi.io/posts", blogPost)
      .then((response) => {
        console.log("Пост создан =>", response.data);
        this.fetchPost().catch((err) => {
          console.log(err);
        });
      });

    /* 

    // Копируем исходный массив в переменную temp
    const temp = [...this.state.blogArr];
    temp.push(blogPost);

    // Обновляем состояние массива
    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);

      // Сохраняем созданный пост в памяти localStorage
      localStorage.setItem("blogPosts", JSON.stringify(posts));

      return {
        blogArr: posts,
      };
    }); 
    
    */
    // И скрываем форму после создани поста(после клика по кнопке СОЗДАТЬ ПОСТ)
    // this.hideAddPostForm();
  };

  // Открыть форму для добавления новых постов
  openAddPostForm = () => {
    this.setState({
      showAddPostForm: !this.state.showAddPostForm,
    });
  };

  // Закрыть форму добавления постов
  hideAddPostForm = () => {
    this.setState({
      showAddPostForm: !this.state.showAddPostForm,
    });
  };

  // Открыть форму для редактирования поста
  openEditPostForm = () => {
    this.setState({
      showEditPostForm: !this.state.showEditPostForm,
    });
  };

  handleSelectedPost = (blogPost) => {
    console.log(blogPost);
    this.setState({
      selectedPost: blogPost,
    });
  };

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .put(
        `https://6314786cfc9dc45cb4ee0081.mockapi.io/posts/${updatedBlogPost.id}`,
        updatedBlogPost
      )
      .then((response) => {
        console.log("Пост отредактирован =>", response);
        this.fetchPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //! Закрыть форму добавления постов по клике на overlay
  // hideAddPostOverlay = (e) => {
  //   console.log(e.target);
  //   this.setState({
  //     showAddPostForm: !this.state.showAddPostForm,
  //   });
  // };

  hideEditPostForm = () => {
    this.setState({
      showEditPostForm: !this.state.showEditPostForm,
    });
  };

  // Закрываем форму по клике на Escape
  componentDidMount() {
    this.fetchPost();
  }

  // Удаляем собитые по нажатию на Escape, после закрытия формы
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          openEditPostForm={this.openEditPostForm}
          handleSelectedPost={() => this.handleSelectedPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) {
      return <h1>Загружаю данные...</h1>;
    }

    const postsOpacity = this.state.isPending ? 0.5 : 1;

    return (
      <div className="container">
        <div className="blog-page">
          {/* {this.state.showBlog ? "Блог показан" : "Блог скрыт"} */}

          {/* <button style={{ color: "#fff" }} onClick={this.toggleShowBlog}>
          {this.state.showBlog ? "Скрыть блог" : "Показать блог"}
        </button> */}

          {this.state.showAddPostForm ? (
            <AddPostForm
              blogArr={this.state.blogArr}
              addNewBlogPost={this.addNewBlogPost}
              hideAddPostForm={this.hideAddPostForm}
              showAddPostForm={this.showAddPostForm}
            />
          ) : null}

          {this.state.showEditPostForm && (
            <EditPostForm
              hideEditPostForm={this.hideEditPostForm}
              selectedPost={this.state.selectedPost}
              editBlogPost={this.editBlogPost}
            />
          )}

          <h1>Блог</h1>
          <button onClick={this.openAddPostForm} className="open-add-form">
            Создать новый пост
          </button>

          <div className="posts" style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </div>
      </div>
    );
  }
}

export default BlogContent;

//! https://youtu.be/Wqz-i_fb4RA?t=6
