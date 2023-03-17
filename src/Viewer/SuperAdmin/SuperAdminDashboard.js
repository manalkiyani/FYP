import classes from "./SuperAdminDashboard.module.css";

import Input from "../../pages/UI/Input";
import Header from "../../pages/UI/Header";
import HeaderAdmin from "../../pages/UI/HeaderAdmin";

import Card from "../../pages/UI/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function AdminDasboard() {
  const [count, setCount] = useState("");
  const [adminsdata, setAdminsdata] = useState();
  const [totalLiveWebs, setTotalLiveWebs] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    console.log("in useeffect, getting admins and this iscount " + { count });
    axios
      .get("http://localhost:8800/api/admin/registeredadmins")
      .then((response) => {
        setCount(response.data.count);
      });

    axios
      .get("http://localhost:8800/api/admin/getadminsdata")
      .then((res) => {
        setAdminsdata(res.data.adminsData);
        setTotalLiveWebs(res.data.totalLiveWebs);

        console.log("thisi s admins data+ " + adminsdata);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8800/api/admin/gettotalpaymentsandmessages")
      .then((res) => {
        setTotalMessages(res.data.messages.length);
        setTotalPayments(res.data.payments.length);
      })
      .catch((error) => console.log(error));
  }, [count, totalLiveWebs, totalPayments, totalMessages]);

  adminsdata &&
    adminsdata.map((row, index) =>
      console.log("this is map: " + row.savedTemplatesCount)
    );

  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div
        style={{
          backgroundColor: "#EBF1FC",
          paddingTop: "25px",
          paddingBottom: "25px",
          width: "80%",
          marginLeft: "10%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card className={classes.background1} tagline="Registered Users">
            {" "}
            {count}
          </Card>
          <Card className={classes.background2} tagline="Live Websites">
            {" "}
            {totalLiveWebs}
          </Card>
          <Card className={classes.background3} tagline="Payments">
            {" "}
            {totalPayments}
          </Card>
          <Card className={classes.background4} tagline="Messages">
            {" "}
            {totalMessages}
          </Card>
        </div>

        <div className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Plan</TableCell>
                  <TableCell align="center">Live Webs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminsdata &&
                  adminsdata.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.activePlan}</TableCell>
                        <TableCell align="center">
                          {row.savedTemplatesCount}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
export default AdminDasboard;
