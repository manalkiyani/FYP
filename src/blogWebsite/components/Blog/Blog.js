import { Link } from "react-router-dom";
import classes from "./Blog.module.css";
import { useParams, useNavigate } from "react-router-dom";
export default function Blog({bid,img,title,tagline,writer,time,desc,deleted,tags,edit})
 {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const viewBlogDetail = () => {
    navigate(`/blog/template/${id}/blogs/${bid}`);
  }



  return (
   
    <div className={classes.post} onClick={viewBlogDetail}>
      
      <img className={classes.postImg} src={img} alt="" />
      <div className= {classes.icons}>
           
            <img
              alt=""
              className={classes.icon}
              onClick={() =>
                edit(bid, title, tagline, tags, desc, writer, time,img)
              }
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670362324/edit_zevkr0.png"
            />
            <img
              alt=""
              className={classes.icon}
              onClick={() => deleted(bid)}
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670362234/delete_wpauco.png"
            />
        
        </div>
      <div className={classes.postInfo}>
      
          
          
        <span className={classes.postTitle}>
          <h6 className={classes.link}>
            {title}
          </h6>
        </span>

        <span className={classes.postDate}>{time}</span>
        {/* <p >{desc}</p> */}
         <div className={classes.postDesc} dangerouslySetInnerHTML={{ __html: desc }}></div>
      </div>
    </div>
  );
}
