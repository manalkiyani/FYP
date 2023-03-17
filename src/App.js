import Write from "./blogWebsite/WritePage/Write";
import Navbar from "./blogWebsite/components/Navbar/Navbar";
import { AuthorizeUser } from "./middleware/auth";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import { createContext } from "react";
import BgColor from "./components/BackgroundColor/BgColor";
import Dashboard from "./pages/Dashboard/dashboard";
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
import Appointments from "./Admin/Appointments/Appointments";
import JobApplications from "./Admin/JobApplications/JobApplications";


import Otp from "./pages/OTP/otp";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Username from "./pages/Username/username";
import UcraftNavbar from "../../FYP/src/components/NavBar/NavBar"
import Blog from "./Viewer/BlogWebsite/components/Blogs/Blog";
import ViewerNavbar from "./Viewer/Components/Navbar/viewerNavbar";
import ViewerHomepage from "./Viewer/BlogWebsite/pages/viewerHomepage";
import ViewerBlogsPage from "./Viewer/BlogWebsite/pages/viewerBlogsPage";

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
  const [templateId, setTemplateId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [template, setTemplate] = React.useState({
    type: "",
    pages: {},
    data: {},
  });

  return (
    <UserContext.Provider
      value={{
        templateId,
        setTemplateId,
        user,
        setUser,
        template,
        setTemplate,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UcraftNavbar />
          <Routes>

      
            <>
              {/* ucraft */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recovery" element={<Otp />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/username" element={<Username />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/dashboard"
                element={
                  <AuthorizeUser>
                  
                    <Dashboard />
                  </AuthorizeUser>
                }
              />
              {/* blog Website Admin */}
              <Route exact path="/blog/template/:id" element={<Navbar />}>
                <Route path="" element={<BlogHomePage />} />
                <Route path="blogs" element={<BlogssPage />} />
                <Route path="write" element={<Write />} />
              </Route>
            </>

            {/* blog Website Viewer */}
            <Route exact path="view/blog/template/:id" element={<ViewerNavbar />}>
              <Route path="" element={< ViewerHomepage/>} />
              <Route path="blogs" element={<ViewerBlogsPage />} />
              <Route path="contactUs" element={<h1>Contact Us</h1> } />
            
            </Route>
            <Route path="/contactsuperadmin" element={<ContactSuperAdmin></ContactSuperAdmin>}></Route>
                <Route path="/superadmindashboard" element={<SuperAdminDasboard/>}></Route>
                <Route path="/Plans" element={<Plan/>}></Route>
                <Route path="/admindashboard" element={<Home/>}></Route>
                <Route path="/publishedwebsites" element={<PublishedWebsites/>}></Route>
                <Route path="/adminmessages" element={<Messages/>}></Route>
                <Route path="/adminpayments" element={<Payments/>}></Route>
                <Route path="/adminappointments" element={<Appointments/>}></Route>
                <Route path="/adminjobapplications" element={<JobApplications/>}></Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
