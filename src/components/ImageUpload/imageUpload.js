import AvatarUpload from './imageUpload'
import React, { useState} from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
const App = (props) => {
const [result, setResult] = useState('');
const [logo, setLogo] = useState('')
const [imageUpload,] = useState({});
const [, setImg]= useState({});
    const handleImg = (e) => {
        if (e.target.files[0]) {
        setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
        });
        setLogo(e.target.files[0]);}

}
const profileUpload =async (file) => {
      const formData= new FormData()
      formData.append("file", file)
      formData.append("upload_preset","korfdfrd")
      let data ="";
      await Axios.post("https://api.cloudinary.com/v1_1/djlewzcd5/image/upload",formData)
      .then((response) => {
        data= response.data["secure_url"];
        setResult(data);
      });
  return data;
}
const handleSubmit= async (e) =>{
    imageUpload.image = logo;
    await profileUpload(logo);
}
return (
<>
    <div>
    <h1 style={{ textAlign: "center",color:"grey", marginTop: "90px",marginRight:"138px"}}>Image Upload in Cloudinary</h1> 
    <div style={{ marginLeft: "50px", marginTop: "50px" }}>
        <AvatarUpload imageUpload={handleImg} image={imageUpload.image} />
    </div>
    <div style={{ marginleft: "10px", marginBottom: "50px", marginTop: "-135px", borderRadius: "25px", fontFamily: "arial"}}>
        <Button type="submit" color="primary" onClick={(e) => handleSubmit(e)}>submit</Button>
    </div>
    <p>{result}</p>
    <img src={result} width="300" height="300" />
    </div>
</>
);

}
export default App;

// import useReducer 
// takes in two parameters = useReducer(reducer,initialState)
// return state and dispatch functionconst [state,dispatch] = useReducer(reducer,initialState)
// action is an object => it can have a type and payload/data/id
// action is passed to reducer by dispatch

