import "./Messages.scss"
import Sidebar from "../../Admin/components/sidebar/Sidebar"
import { getUsername,getUser } from "../../utilityFunctions/authFunctions"
import Datatable from "./Datatable/Datatable"
import { useEffect } from "react"
import React from 'react';

const Messages = () => {
  const [id, setId] = React.useState(null);
 const getUserId = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };
useEffect (()=>{
  getUserId()
  .then((data) => {
        setId(data._id);
      })
      .catch((err) => {
        console.log(err);
      });
},[])



  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">

       { id && <Datatable id ={id}/>}
      </div>
    </div>
  )
}

export default Messages;