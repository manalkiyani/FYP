import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const Datatable = () => {

  const [ordersData, setOrdersData]= useState([])

  const handleReply = async () => {


 };


 useEffect(() => {

    axios.post("http://localhost:8800/api/admin/getjobapplicationsonadmindashboard",{ADMIN_ID:'64045dc3c9f73b8649beebe4'})
      .then((response) => {
        
        console.log(response.data + "this is appointment data");
        setOrdersData(response.data);
      })
      .catch((error) => {
        console.error(error);
      })

  
}, []);
 

  const userColumns = [

    { field: "paymentmethod", headerName: "Customer Name",     width: 230, },
    { field: "address", headerName: "Designation",    width: 200, },
    { field: "totalprice", headerName: "Application",   width: 200,},
    {
      field: "status",
      headerName: "Status",
      width: 200,

      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <button onClick={() => handleReply(params)}>Sent</button>
      ),
    },
    
  ];



  return (
    <div className="datatable">
      <div className="datatableTitle">
        Job Applications

      </div>
      <DataGrid
        className="datagrid"
        rows={ordersData} //////replace tempData with data to make it work
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.address}
        checkboxSelection = {false}
      />
    </div>
  );
};
export default Datatable;
