import { Link } from "react-router-dom";
import classes from "./Blog.module.css";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon } from "react-share";

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
       {console.log(img)}
      <img className={classes.postImg} src={img} alt="" />
      <div className={classes.postInfo}>
        <div className={classes.container}>
          <div className={classes.postCats}>
            {tags.split(",").map((tag) => {
              return (
                <span key={tag} className={classes.postCat}>
                  <Link className={classes.link} to="/posts?cat=Music">
                    {tag}
                  </Link>
                </span>
              );
            })}
          </div>
          <div>
            <FacebookShareButton
              url="https://blog.logrocket.com/integrating-google-maps-react/"
              quote="This is me"
              hashtag="#Music#Technology"
            >
              <FacebookIcon className={classes.icon} round={true}></FacebookIcon>
            </FacebookShareButton>
            <img
              alt=""
              className={classes.icon}
              onClick={() =>
                edit(bid, title, tagline, tags, desc, writer, time)
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
        </div>
        <span className={classes.postTitle}>
          <Link to="" className={classes.link}>
            {title}
          </Link>
        </span>

        <span className={classes.postDate}>{time}</span>
        <p className={classes.postDesc}>{desc}</p>
      </div>
    </div>
  );
}
