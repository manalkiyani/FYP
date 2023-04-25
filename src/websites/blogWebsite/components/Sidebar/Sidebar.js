import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { getBookmarkedBlogs } from "../../../utilityFunctions/axiosFunctions";

const testUserId="63e8df1974cc16f2b7ecacb6";
export default function Sidebar({changed}) {
  const [bookmarkedBlogs, setBookmarkedBlogs] = React.useState([]);

  useEffect(() => {
    getBookmarkedBlogs(testUserId).then((res) => {
     
      setBookmarkedBlogs(res.blogs);
    });
  }, [changed]);
 

  return (
    <div className="sidebar">
   
      <div className="sidebarItem">
        <span className="sidebarTitle">BOOKMARKED BLOGS</span>
       
        <ul className="sidebarList">
           {bookmarkedBlogs.map((blog) => (
            <li
            key={blog._id}
             className="sidebarListItem">
              <img
               style={{width:'70px',height:'70px',borderRadius:'50px',marginRight:'10px'}}
          src={blog.image}
          alt={blog.title}
          
        />
        <div>
           <p >
        {blog.title.toLowerCase()}
        </p>
         <p style={{fontSize:'12px',color:'#999999',fontStyle:'italic'}} >
        {blog.readingTime}
        </p>
        </div>
        
          </li>
           ))}
          
          
     
        </ul>
      </div>
    
    </div>
  );
}