import Main from "./Main";
import Write from "./blogWebsite/WritePage/Write";
import Navbar from "./blogWebsite/components/Navbar/Navbar";
import BlogsPage from "./blogWebsite/BlogsPage/BlogsPage";
import MobileNav from "./components/NavBar/NavBar";
import { createContext } from "react";
import { Provider } from "react";
import Dashboard from "./pages/Dashboard/dashborad";
import HomePage from "./pages/HomePage/HomePage";
import BlogHomePage from "./blogWebsite/HomePage/BlogHomePage";
import BlogssPage from "./blogWebsite/BlogsPage/BlogssPage";
import SuperAdminDasboard from "./SuperAdmin/SuperAdminDashboard";
import Plan from "./Plan/Plan";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactSuperAdmin from "./pages/ContactSuperAdmin/ContactSuperAdmin";
import Home from "./Admin/Home/Home";
import PublishedWebsites from "./Admin/PublishedWebsites/PublishedWebsites";
import Messages from "./Admin/Messages/Messages";
import AdminDasboard from "./SuperAdmin/SuperAdminDashboard";
import Payments from "./Admin/Payments/Payments";

const theme = createTheme({
  palette: {
    primary: {
      main: "#40AFC0",
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});
export const UserContext = createContext();
const App = () => {
  const [template, setTemplate] = React.useState({
    type:'',
    pages:{},
    data:{}
  });
 
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <UserContext.Provider value={{ template, setTemplate }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/* <Template /> */}

          {/* <Login/> */}

          <Routes>
            {(
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              
                
                <Route exact path="/blog/template" element={<Navbar />} >
                  <Route path="blogs" element={<BlogssPage />}/>
                  <Route path="write" element={<Write />} />
                  <Route path="" element={<BlogHomePage />} />
                </Route>
                <Route path="/contactsuperadmin" element={<ContactSuperAdmin></ContactSuperAdmin>}></Route>
                <Route path="/superadmindashboard" element={<SuperAdminDasboard/>}></Route>
                <Route path="/Plans" element={<Plan/>}></Route>
                <Route path="/admindashboard" element={<Home/>}></Route>
                <Route path="/publishedwebsites" element={<PublishedWebsites/>}></Route>
                <Route path="/adminmessages" element={<Messages/>}></Route>
                <Route path="/adminpayments" element={<Payments/>}></Route>
                
              </>
            )}n
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
