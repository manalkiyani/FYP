import React, { useEffect } from "react";

import "./Sidebar.css";
import { getBookmarkedBlogs } from "../../../../utilityFunctions/axiosFunctions";
import { useNavigate } from "react-router-dom";


const testUserId="63e8df1974cc16f2b7ecacb6";
export default function Sidebar({changed}) {
  const [bookmarkedBlogs, setBookmarkedBlogs] = React.useState([]);

  useEffect(() => {
    getBookmarkedBlogs(testUserId).then((res) => {
     
      setBookmarkedBlogs(res.blogs);
    });
  }, [changed]);
   const navigate = useNavigate();
const viewBlogDetail = (bid) => {
    navigate(`${bid}`);
  };
  return (
    <div className="sidebar">
   
      <div className="sidebarItem">
        <span className="sidebarTitle">BOOKMARKED BLOGS</span>
       
        <ul className="sidebarList">
           {bookmarkedBlogs.map((blog) => (
            <li
            onClick={()=>viewBlogDetail(blog._id)}
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