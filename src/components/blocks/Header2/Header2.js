import React, { useRef, useState } from 'react'

const Header2 = (props) => {
let html="";
  const[style1,setStyle1]=useState('red');
  const[style2,setStyle2]=useState('red');
  const ph1=useRef(null);
  const ph2=useRef(null);


  const handler=(ref)=>{
    if (ref==="ph1")
    {html={...ph1};
    setStyle1('yellow');
  
  }
    else
   { html={...ph2};
   setStyle2('yellow');
  }

    console.log(html.current)
   
  }
  return (
    <div style={{background:'pink',justifyContent:'center',alignItems:'center',width:'100%'}}>
      
        <button >click em</button>
        <p ref={ph1} onClick={()=>handler("ph1") }style={{color:style1}}>p1</p>
        <p ref={ph2} onClick={()=>handler("ph2")  }style={{color:style2}}>p2</p>
    </div>
  )
}

export default Header2;