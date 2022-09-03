import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import BlogContent from "./Components/BlogContent/BlogContent";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <BlogContent random="random props" />
      <Footer year={new Date().getFullYear()} />
    </div>
  );
}

export default App;
