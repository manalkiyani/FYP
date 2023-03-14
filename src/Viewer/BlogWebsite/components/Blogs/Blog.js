import { Link } from "react-router-dom";
import classes from "../../../../blogWebsite/components/Blog/Blog.module.css";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
export default function Blog({
  bid,
  img,
  title,
  tagline,
  writer,
  time,
  desc,
  deleted,
  tags,
  edit,
}) {
  return (
    <div className={classes.post}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
        <span className={classes.postTitle}>{title}</span>
        <BookmarkAdd />
      </div>
       <span className={classes.postDate}>{time}</span>

      <img className={classes.postImg} src={img} alt="" />
      <div className={classes.postInfo}>
        <div className={classes.container}>
          <div className={classes.postCats}>
            {tags.split(",").map((tag) => {
              return (
              
                <div key={tag} className={classes.postCat}>
                  <center>    {tag}</center>
              
                </div>
              );
            })}
          </div>
          <div>
            <FacebookShareButton
              url="https://blog.logrocket.com/integrating-google-maps-react/"
              quote="This is me"
              hashtag="#Music#Technology"
            >
              
             <FacebookOutlinedIcon/>
            </FacebookShareButton>
          </div>
        </div>

       
        <p className={classes.postDesc}>{desc}</p>
      </div>
    </div>
  );
}
