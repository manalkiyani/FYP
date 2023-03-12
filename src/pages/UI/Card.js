import classes from "./Card.module.css";

const Card = (props)=>{
    return(
        <div className={`${props.className}`} style={{borderRadius: '10px', width: '200px',height:"120px",display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <h1 style={{color:'white'}}>
        {props.children}
        </h1>
        <p style={{marginTop:'-8px', color:'white'}}>{props.tagline}</p>
    </div>

    )
} 
export default Card;