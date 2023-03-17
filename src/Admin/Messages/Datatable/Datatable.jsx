import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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

    { field: "email", headerName: "Email",     width: 230, },
    { field: "message", headerName: "Message",    width: 200, },
    { field: "subject", headerName: "Subject",   width: 200,},
    {
      field: "reply",
      headerName: "Reply",
      width: 200,

      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <button onClick={() => handleReply(params)}>Reply</button>
      ),
    },
    
  ];



  return (
    <div className="datatable">
      <div className="datatableTitle">
        Messages

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
