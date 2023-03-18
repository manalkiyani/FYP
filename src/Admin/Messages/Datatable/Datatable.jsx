import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ReplyForm from "../../ReplyForm/ReplyForm";


const Datatable = () => {
  const [fetchData, setFetchData] = useState(true);
  const [tempData, setTempData]= useState([])
  const [email, setEmail] = useState('');
  const [open, setOpen]= useState(false)
  const handleReply = async (params) => {

    await setEmail(params.row.email)
    
   console.log(params.row.email); // log the email of the selected row
   setOpen(true);
   
   


 };


  useEffect(() => {
    if (fetchData) {
      axios.post("http://localhost:8800/api/admin/getmessagesonadmindashboard",{ADMIN_ID:'64058525e63bfc4d3d681984'})
        .then((response) => {
          setTempData(response.data);
          console.log(response.data + "this is messages data");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setFetchData(false);
        });
    }
  }, [fetchData]);

  const userColumns = [

    { field: "email", headerName: "Email",     width: 300, },
    { field: "message", headerName: "Message",    width: 300, },
    { field: "subject", headerName: "Subject",   width: 250,},
    {
      field: "reply",
      headerName: "Reply",
      width: 200,

      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button onClick={() => handleReply(params)}>Reply</Button>
      ),
    },
    
  ];



  return (
    <div className="datatable">
      <div className="datatableTitle">
        <p style={{color:'#40AFC0'}} className="headertext">Messages</p>

      </div>
      <DataGrid
        className="datagrid"
        rows={tempData} //////replace tempData with data to make it work
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.email}
        checkboxSelection = {false}
      />
      {open && <ReplyForm email = {email} open={open} setOpen={setOpen}></ReplyForm>}
    </div>
  );
};

export default Datatable;
