import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670359878/pexels-tobias-bj%C3%B8rkli-2104152_e2z3fd.jpg"
        alt=""
      />
    </div>
  );
}