import axios from "axios";
import React from "react";
// import { posts } from "../../shared/ProjectData";

import "../BlogContent/BlogContent.css";
import AddPostForm from "./components/AddPostForm/AddPostForm";
import BlogCard from "./components/BlogCard";

class BlogContent extends React.Component {
  // состояния
  state = {
    showAddPostForm: false,
    // showBlog: true,
    blogArr: [],
    isPending: true,
  };

  fetchPost = () => {
    this.setState({
      isPending: true,
    });
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

  // Лайк постовы
  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    console.log(temp);
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  // Функция которая скрывает и показывает БЛОГ

  /*  toggleShowBlog = () => {
    // Меняем состояние state в showBlog
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog,
      };
    });
  }; */

  // Удаление постов
  deletePost = (blogPost) => {
    if (window.confirm(`Вы точно хотите удалить ${blogPost.title}?`)) {
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

  //! Закрыть форму добавления постов по клике на overlay
  // hideAddPostOverlay = (e) => {
  //   console.log(e.target);
  //   this.setState({
  //     showAddPostForm: !this.state.showAddPostForm,
  //   });
  // };

  // Обратботка клика по Escape при открытой форме
  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddPostForm) {
      // console.log("нажали esc");
      this.hideAddPostForm();
    }
  };

  // Добавляем новый пост в массив
  addNewBlogPost = (blogPost) => {
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
    // И скрываем форму после создани поста(после клика по кнопке СОЗДАТЬ ПОСТ)
    // this.hideAddPostForm();
  };

  // Закрываем форму по клике на Escape
  componentDidMount() {
    this.fetchPost();
    window.addEventListener("keyup", this.handleEscape);
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
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) {
      return <h1>Загружаю данные...</h1>;
    }
    return (
      <>
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

        <div className="container">
          <h1>Блог</h1>
          Так же послушай радио
          <iframe
            style={{ "border-radius": 10 }}
            src="https://radiovolna.net/embed/?ids=1570&logo=1&bg=%23f5f6f9&title=%231b1c1f"
            frameborder="0"
            width="100%"
            height="55px"
            scrolling="no"
          ></iframe>
          <button onClick={this.openAddPostForm} className="open-add-form">
            Создать новый пост
          </button>
          {this.state.isPending && "Подождите, идет загрузка сервера"}
          <div className="posts">{blogPosts}</div>
        </div>
      </>
    );
  }
}

export default BlogContent;
