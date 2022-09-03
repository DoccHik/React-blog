import React from "react";
import { posts } from "../../shared/ProjectData";

import "../BlogContent/BlogContent.css";
import BlogCard from "./components/BlogCard";

class BlogContent extends React.Component {
  // состояния
  state = {
    showBlog: true,
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || posts,
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
  toggleShowBlog = () => {
    // Меняем состояние state в showBlog
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog,
      };
    });
  };

  // Удаление постов
  deletePost = (pos) => {
    if (
      window.confirm(
        `Вы точно хотите удалить ${this.state.blogArr[pos].title}?`
      )
    ) {
      // Копия массива через spread(...) и присваивание в переменную temp
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);
      console.log("Эталонный массив =>", this.state.blogArr);
      console.log("Временный массив =>", temp);

      // Присваивание временного массива в исходное состояние
      this.setState({
        blogArr: temp,
      });
      localStorage.setItem("blogPosts", JSON.stringify(temp));
    }
  };

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });
    return (
      <>
        {this.state.showBlog ? "Блог показан" : "Блог скрыт"}
        <button style={{ color: "#fff" }} onClick={this.toggleShowBlog}>
          {this.state.showBlog ? "Скрыть блог" : "Показать блог"}
        </button>
        {this.state.showBlog ? (
          <div className="container">
            <h1>SimpleBlog</h1>
            <div className="posts">{blogPosts}</div>
          </div>
        ) : null}
      </>
    );
  }
}

export default BlogContent;

// ! https://youtu.be/hYia2jT8nD8?t=3 lesson-8
