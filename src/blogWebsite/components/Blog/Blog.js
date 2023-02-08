import { Link } from "react-router-dom";
import "./Blog.css";
import{FacebookShareButton,WhatsappShareButton} from 'react-share';
import {FacebookIcon,WhatsappIcon} from 'react-share'

export default function Blog({bid,img,title,tagline,writer,time,desc,deleted,tags,edit}) {

  return (
    <div className="post">
      <img
        className="postImg"
        src={img}
        alt=""
      />
      <div className="postInfo">
        <div className="container">
            <div className="postCats">
                {tags.split(',').map(tag=>{
                  return (   
                        <span className="postCat">
                          <Link className="link" to="/posts?cat=Music">
                            {tag}
                          </Link>
                        </span>)
                })}
       
         
            </div>
            <div>
               <FacebookShareButton
                url="https://blog.logrocket.com/integrating-google-maps-react/"
                quote="This is me"
                hashtag="#Music#Technology">
              <FacebookIcon className="icon" round={true}></FacebookIcon>
              </FacebookShareButton>
                <img alt="" className="icon" onClick ={()=>edit(bid,title,tagline,tags,desc,writer,time)}
                src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670362324/edit_zevkr0.png"/>
                <img alt="" className="icon" onClick={()=>deleted(bid)}
                src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670362234/delete_wpauco.png"/>
                
                
            </div>
            
        </div>
        <span className="postTitle">
          <Link to="" className="link">
            {title}
          </Link>
        </span>
       
        <span className="postDate">{time}</span>
         <p className="postDesc">
        {desc}
      </p>
     
      </div>
     
    </div>
  );
}