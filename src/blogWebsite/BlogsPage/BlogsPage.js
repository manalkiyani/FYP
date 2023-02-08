import { useLocation } from "react-router";
import Header from "../components/Header/Header";
import Blogs from "../components/Blogs/Blogs";
import Sidebar from "../components/Sidebar/Sidebar";

import "./BlogsPage.css";

export default function BlogsPage() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header />
      <div className="home">
        <Blogs />
        <Sidebar />
      </div>
    </>
  );
}