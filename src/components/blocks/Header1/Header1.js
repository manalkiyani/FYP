import React, { Component } from 'react';

import classes from './Header1.module.css';
import HandleBlock from '../HandleBlock/handleBlock';
import ContentEditable from 'react-contenteditable';
import ButtonMenu from '../linkButton/btnMenu/buttonMenu';
import SocialIcons from '../socialIcons/socialIcons';


export default class Header1 extends Component {
 state={
  showMenu:false,
  ref:null,
  displayHandleBlock:false
 }

 
  handleTextChange = (e)=>{
    console.log(e.target.value)
    this.props.changeText(e.target.value)
  }
  delBlock= () =>{
    this.props.deleteBlock(this.props.id)
  }
  handleClick = ()=>{
    this.props.onClick(this.props.id,"btn",null)
    this.setState({
      showMenu:true
    })

  }
  linkButton = (link) => {
    this.setState({showMenu:false})
    
    console.log(link)
  }

  disableHandleBlock = ( ) =>{
    this.setState({
      displayHandleBlock:false
    })
  }
  enableHandleBlock = ( ) =>{
    this.setState({
      displayHandleBlock:true
    })
  }
  handleSocialIcons = (socialIcons) =>{
      this.props.handleSocialIcons(socialIcons,this.props.id)
  }
  
  render() {
    return (
    
      
      <div 
      style={{backgroundImage: `url('https://res.cloudinary.com/djlewzcd5/image/upload/v1670276048/simon-berger-twukN12EN7c-unsplash_uw0xao.jpg')`,boxShadow:this.props.dragDisable === false ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' :'none'}}
      onMouseOver={this.enableHandleBlock}  onMouseOut={this.disableHandleBlock}
      className={classes.header} >
      
       
     { this.state.displayHandleBlock &&
     <HandleBlock 
     del={this.delBlock}
     enableDrag={this.props.enableDrag}/>

     }  
           <p></p>
           
          <ContentEditable  
            className={classes.h}
            html={this.props.Data.data.h.text} // innerHTML of the editable div
            disabled={false}   // use true to disable editing
                              
            onChange={(e)=>this.handleTextChange(e)} // handle innerHTML change

            onClick={()=>this.props.onClick(this.props.id,"h",null)}
            style={{
            
              fontSize: this.props.Data.data.h.size, 
              fontFamily:this.props.Data.data.h.family,
              color: this.props.Data.data.h.color,
              fontWeight:this.props.Data.data.h.bold === true ? 'bold' :'normal',
              textDecoration: this.props.Data.data.h.underline === true ? 'underline' :'none',
              fontStyle: this.props.Data.data.h.italic === true ? 'italic' :'normal',
              textAlign: this.props.Data.data.h.align,
            
            }}/>
            

          <ContentEditable 
            
            html={this.props.Data.data.p.text} // innerHTML of the editable div
            disabled={false}   // use true to disable editing
            className={classes.p}
            onClick={()=>this.props.onClick(this.props.id,"p",null)}
            onChange={(e)=>this.handleTextChange(e)} // handle innerHTML change
            style={{
            fontSize: this.props.Data.data.p.size,
            fontFamily:this.props.Data.data.p.family,
            color: this.props.Data.data.p.color,
            fontWeight:this.props.Data.data.p.bold === true ? 'bold' :'normal',
            textDecoration: this.props.Data.data.p.underline === true ? 'underline' :'none',
            fontStyle: this.props.Data.data.p.italic === true ? 'italic' :'normal',
            textAlign: this.props.Data.data.p.align,
            
            }}/>
          
          {this.state.showMenu ? <ButtonMenu onClick={this.linkButton}/> : null }
           
          <ContentEditable 
            className={classes.btn}
            html={this.props.Data.data.btn.text}
            disabled={false} 
            onClick={this.handleClick }
            onChange={(e)=>this.handleTextChange(e)} 
            // onClick ={(e)=>{
            //   e.preventDefault();
            //   window.open('');
            // }}
            style={{
              fontSize: this.props.Data.data.btn.size,
              fontFamily:this.props.Data.data.btn.family,
              color: this.props.Data.data.btn.color,
              fontWeight:this.props.Data.data.btn.bold === true ? 'bold' :'normal',
              textDecoration: this.props.Data.data.btn.underline === true ? 'underline' :'none',
              fontStyle: this.props.Data.data.btn.italic === true ? 'italic' :'normal',
              textAlign: this.props.Data.data.btn.align
            }}/>
         
         <SocialIcons 
         socialIcons = {this.props.Data.socialIcons}
         handleSocialIcons = {this.handleSocialIcons}
         />
        

        
         
           
                
           
      </div>
    )
  }
}
