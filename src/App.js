
import Write from "./blogWebsite/WritePage/Write";
import Navbar from "./blogWebsite/components/Navbar/Navbar";
import { AuthorizeUser } from "./middleware/auth";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import { createContext } from "react";

import Dashboard from "./pages/Dashboard/dashborad";
import HomePage from "./pages/HomePage/HomePage";
import BlogHomePage from "./blogWebsite/HomePage/BlogHomePage";
import BlogssPage from "./blogWebsite/BlogsPage/BlogssPage";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Otp from "./pages/OTP/otp";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Username from "./pages/Username/username";
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
  const [user, setUser] = React.useState(null);
  const [template, setTemplate] = React.useState({
    type:'',
    pages:{},
    data:{} 
  });
 
 
  return (
    <UserContext.Provider value={{user,setUser, template, setTemplate }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/* <Template /> */}

          {/*  */}

          <Routes>
          
              <>

                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/recovery" element={<Otp/>} />
                <Route path="/reset" element={<ResetPassword/>} />
                 <Route path="/username" element={<Username/>} />
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<AuthorizeUser><Dashboard /></AuthorizeUser>  } />
                
                <Route exact path="/blog/template" element={<Navbar />} >
                  <Route path="blogs" element={<BlogssPage />}/>
                  <Route path="write" element={<Write />} />
                  <Route path="" element={<BlogHomePage />} />
                </Route>

                
              </>
         
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
