import { AuthorizeUser } from "./middleware/auth";
import { createContext } from "react";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//ucraft
import Otp from "./pages/OTP/otp";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Username from "./pages/Username/username";
import UcraftNavbar from "../../FYP/src/components/NavBar/NavBar";
import Plan from "./pages/Plan/Plan";
import ContactSuperAdmin from "./pages/ContactSuperAdmin/ContactSuperAdmin";
import ContactForm from "./pages/ContactUs/ContactUs";
import Home from "./Admin/Home/Home";
import PublishedWebsites from "./Admin/PublishedWebsites/PublishedWebsites";
import Messages from "./Admin/Messages/Messages";
import Payments from "./Admin/Payments/Payments";

import Appointments from "./Admin/Appointments/Appointments";
import JobApplications from "./Admin/JobApplications/JobApplications";

import Dashboard from "./pages/Dashboard/dashboard";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";

// ecommerce Website
import ProductsPage from "./eccomerceWebsite/pages/ProductsPage";
import CartPage from "./eccomerceWebsite/pages/CartPage";
import EcomHomePage from "./eccomerceWebsite/pages/ecomHomePage/ecomHomePage";
import EcomProductsPage from "./eccomerceWebsite/pages/ecomProductsPage/ecomProductPage";

//blog Website
import BlogHomePage from "./blogWebsite/HomePage/BlogHomePage";
import BlogssPage from "./blogWebsite/BlogsPage/BlogssPage";
import Write from "./blogWebsite/WritePage/Write";

//common components
import ViewerContactForm from "./Viewer/ContactUsPage/ContactUs";
//admin
import Navbar from "./CommonComponnets/Navbar/Navbar";

//viewer
import ViewerNavbar from "./Viewer/Components/Navbar/viewerNavbar";
import ViewerHomepage from "./Viewer/BlogWebsite/pages/viewerHomepage";
import ViewerMainPage from "./Viewer/BlogWebsite/pages/viewerMainPage";

import BlogDetail from "../src/blogWebsite/BlogDetail/BlogDetail";

import Test from "./Test";
import AddJob from "./businessWebsite/Pages/addJob/AddJob";
import ViewJobs from "../src/Viewer/BusinessWebsite/Pages/ViewJobs/ViewJobs";
import ApplyJob from "../src/Viewer/BusinessWebsite/Pages/ApplyJob/ApplyJob";
import ApplicationDetail from "./businessWebsite/Pages/Applications/ApplicationDetail";
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
  const [contextImage, setContextImage] = React.useState(null);
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
        contextImage,
        setContextImage,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UcraftNavbar />
          <Routes>
            <>
              {/* ucraft */}
              <Route path="/login" element={<Login />} />
              <Route path="/addJob" element={<AddJob />} />
              <Route path="/viewJob" element={<ViewJobs />} />
              <Route path="/applyJob" element={<ApplyJob />} />
              <Route path="/applicationDetail" element={<ApplicationDetail />} />
              {/* <Route path="/test" element={<Test />} /> */}
              <Route path="/blogDetail" element={<BlogDetail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recovery" element={<Otp />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/username" element={<Username />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactForm />}></Route>
              <Route path="/pricing" element={<Plan />}></Route>
              <Route
                path="/dashboard"
                element={
                  <AuthorizeUser>
                    {" "}
                    <Home />{" "}
                  </AuthorizeUser>
                }
              />

              {/* Admin */}
              <Route path="/admindashboard" element={<Home />}></Route>
              <Route
                path="/publishedwebsites"
                element={<PublishedWebsites />}
              ></Route>
              <Route path="/adminmessages" element={<Messages />}></Route>
              <Route path="/adminpayments" element={<Payments />}></Route>
              <Route
                path="/adminappointments"
                element={<Appointments />}
              ></Route>
              <Route
                path="/adminjobapplications"
                element={<JobApplications />}
              ></Route>

              {/* blog Website Admin */}
              <Route
                exact
                path="/blog/template/:id"
                element={
                  <Navbar
                    type="blog"
                    pages={["", "blogs", "write"]}
                    names={["Home", "Blogs", "Write"]}
                  />
                }
              >
                <Route path="" element={<BlogHomePage />} />
                <Route path="blogs" element={<BlogssPage />} />
                <Route path="blogs/:blogId" element={<BlogDetail />} />
                <Route path="write" element={<Write />} />
              </Route>
            </>

            {/* blog Website Viewer */}
            <Route
              exact
              path="view/blog/template/:id"
              element={
                <ViewerNavbar
                  type="blog"
                  pages={["", "blogs", "contactUs"]}
                  names={["Home", "Blogs", "Contact Us"]}
                />
              }
            >
              <Route path="" element={<ViewerHomepage />} />
              <Route path="blogs" element={<ViewerMainPage type="blog" />} />
              <Route path="contactUs" element={<ViewerContactForm />} />
            </Route>

            {/* eccomerce Website Admin */}
            <Route
              exact
              path="/eccomerce/template/:id"
              element={
                <Navbar
                  type="eccomerce"
                  pages={["", "products"]}
                  names={["Home", "Products"]}
                />
              }
            >
              <Route path="" element={<EcomHomePage />} />
              <Route path="products" element={<EcomProductsPage />} />
            </Route>

            {/* eccomerce Website Viewer */}
            <Route
              exact
              path="view/eccomerce/template/:id"
              element={
                <ViewerNavbar
                  type="eccomerce"
                  pages={["", "products", "cart", "contactUs"]}
                  names={["Home", "Products", "Cart", "Contact Us"]}
                />
              }
            >
              <Route path="" element={<ViewerHomepage />} />
              <Route
                path="products"
                element={<ViewerMainPage type="eccomerce" />}
              />
              <Route path="cart" element={<CartPage />} />
              <Route path="contactUs" element={<ViewerContactForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
