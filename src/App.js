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

import Dashboard from "./pages/Dashboard/dashboard";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";

// ecommerce Website
import CartPage from "./websites/eccomerceWebsite/pages/CartPage";
import EcomHomePage from "./websites/eccomerceWebsite/pages/ecomHomePage/ecomHomePage";
import EcomProductsPage from "./websites/eccomerceWebsite/pages/ecomProductsPage/ecomProductPage";
//blog Website
import BlogHomePage from "./websites/blogWebsite/HomePage/BlogHomePage";
import BlogssPage from "./websites/blogWebsite/BlogsPage/BlogssPage";
import Write from "./websites/blogWebsite/WritePage/Write";
import BlogDetail from "../src/websites/blogWebsite/BlogDetail/BlogDetail";

//business Website
import AddJob from "../src/websites/businessWebsite/Pages/addJob/AddJob";
import ViewJobs from "../src/Viewer/BusinessWebsite/Pages/ViewJobs/ViewJobs";
import ApplyJob from "../src/Viewer/BusinessWebsite/Pages/ApplyJob/ApplyJob";
import ApplicationDetail from "../src/websites/businessWebsite/Pages/Applications/ApplicationDetail";
import JobDetail from "../src/websites/businessWebsite/Pages/JobDetail/JobDetail";

import JobApplications from "./Admin/JobApplications/JobApplications";

//medical Website
import MedicalAdminHomePage from "./websites/medicalWebsite/MedicalAdminHomePage/MedicalAdminHomePage";
import MedicalViewerHomePage from "./Viewer/medicalWebsite/ MedicalViewerHomePage/MedicalViewerHomePage";
import DoctorsPage from "../src/websites/medicalWebsite/DoctorsPage/DoctorsPage";
import AddDoctorPage from "../src/websites/medicalWebsite/AddDoctorPage/AddDoctorPage";
import DocProfile from "../src/websites/medicalWebsite/DocProfile/DocProfile";
import ViewerDocProfile from "./Viewer/medicalWebsite/DocProfile/ViewerDocProfile";
import ViewerDoctorsPage from "./Viewer/medicalWebsite/DoctorsPage/ViewerDoctorsPage";
import Appointments from "./Admin/Appointments/Appointments";

//common components
import ViewerContactForm from "./Viewer/ContactUsPage/ContactUs";
import Navbar from "./websites/CommonComponnets/Navbar/Navbar";

//admin

//viewer
import ViewerNavbar from "./Viewer/Components/Navbar/viewerNavbar";
import ViewerHomepage from "./Viewer/BlogWebsite/pages/viewerHomepage";
import ViewerMainPage from "./Viewer/BlogWebsite/pages/viewerMainPage";

import BusinessHomePage from "./websites/businessWebsite/utilityPages/BusinessHomePage";
import BusinessJobsPage from "./websites/businessWebsite/utilityPages/BusinessJobsPage";

import BookAppointmentPage from "./Viewer/medicalWebsite/BookAppointmentPage/BookAppointmentPage";
import ViewerSignupPage from "./Viewer/medicalWebsite/ViewerSignupPage/ViewerSignupPage";
import ViewerLoginPage from "./Viewer/medicalWebsite/ViewerLoginPage/ViewerLoginPage";
import ViewerViewAppointments from "./Viewer/medicalWebsite/ViewerViewAppointments/ViewerViewAppointments";
import AdminViewAppointments from "./websites/medicalWebsite/AdminViewAppointments/AdminViewAppointments";
import ManageWebsite from "./websites/businessWebsite/ManageWebsite/ManageWebsite";

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

  const [user, setUser] = React.useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        contextImage,
        setContextImage,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <>
              {/* ucraft */}

              <Route exact path="/" element={<UcraftNavbar />}>
                <Route path="" element={<HomePage />} />
                <Route path="contact" element={<ContactForm />}></Route>
                <Route path="pricing" element={<Plan />}></Route>
                <Route
                  path="dashboard"
                  element={
                    <AuthorizeUser>
                      {" "}
                      <Home />{" "}
                    </AuthorizeUser>
                  }
                />
              </Route>

              {/* //////////////// */}

              <Route
                path="/MedicalAdminHomePage"
                element={<MedicalAdminHomePage />}
              />
              <Route
                path="/medicalviewerhomepage"
                element={<MedicalViewerHomePage></MedicalViewerHomePage>}
              />
              <Route path="/doctorspage" element={<DoctorsPage />} />
              <Route path="/adddoctor" element={<AddDoctorPage />} />
              <Route path="/docprofile" element={<DocProfile />} />
              <Route path="/viewerdocprofile" element={<ViewerDocProfile />} />

              <Route
                path="/viewerdoctorspage"
                element={<ViewerDoctorsPage />}
              />
              <Route
                path="/BookAppointmentPage"
                element={<BookAppointmentPage />}
              />
              <Route path="/patientsignuppage" element={<ViewerSignupPage />} />
              <Route path="/patientloginpage" element={<ViewerLoginPage />} />
              <Route
                path="/viewerviewappointments"
                element={<ViewerViewAppointments></ViewerViewAppointments>}
              ></Route>

              <Route
                path="/adminviewappointments"
                element={<AdminViewAppointments></AdminViewAppointments>}
              ></Route>
              <Route path="/login" element={<Login />} />

              {/* <Route path="/test" element={<Test />} /> */}
              <Route path="/blogDetail" element={<BlogDetail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/recovery" element={<Otp />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/username" element={<Username />} />

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
              <Route path="blogs/:blogId" element={<BlogDetail />} />
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
              <Route path="contactUs" element={<ViewerContactForm />} />
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

            {/* business Website Admin */}
            <Route
              exact
              path="/business/template/:id"
              element={
                <Navbar
                  type="business"
                  pages={["", "jobs", "contactUs"]}
                  names={["Home", "Jobs", "Contact Us"]}
                />
              }
            >
              <Route path="" element={<BusinessHomePage />} />
              <Route path="jobs" element={<BusinessJobsPage />} />
              <Route path="jobs/:jobId" element={<JobDetail />} />
              <Route path="jobs/:jobId/apply" element={<ApplyJob />} />

              <Route path="contactUs" element={<ViewerContactForm />} />
              <Route path="manage" element={<ManageWebsite />} />

              {/* <Route path="applications" element={<BussinessApplicationsPage />} /> */}
              {/* <Route path="products" element={<BussinessContactUsPage />} />*/}
            </Route>

            <Route path="/addJob" element={<AddJob />} />
            <Route path="/viewJob" element={<ViewJobs />} />
            <Route path="/applyJob" element={<ApplyJob />} />
            <Route path="/applicationDetail" element={<ApplicationDetail />} />
            <Route path="/jobDetail" element={<JobDetail />} />
            {/* business Website Viewer */}
            <Route
              exact
              path="view/business/template/:id"
              element={
                <ViewerNavbar
                  type="business"
                  pages={["", "jobs", "contactUs"]}
                  names={["Home", "Jobs", "Contact Us"]}
                />
              }
            >
              <Route path="" element={<ViewerHomepage />} />
              <Route path="jobs" element={<ViewerMainPage type="business" />} />

              <Route path="contactUs" element={<ViewerContactForm />} />
            </Route>
            {/*medical Website Admin */}

            <Route
              exact
              path="/medical/template/:id"
              element={
                <Navbar
                  type="medical"
                  pages={["", "doctors", "appointments"]}
                  names={["Home", "Doctors", "Appointments"]}
                />
              }
            >
              <Route path="" element={<MedicalAdminHomePage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              {/* <Route path="doctors/:doctorId" element={<medicalDetail />} /> */}
              <Route path="appointments" element={<AdminViewAppointments />} />
            </Route>

            {/* medical Website Viewer */}

            <Route
              exact
              path="view/medical/template/:id"
              element={
                <ViewerNavbar
                  type="medical"
                  pages={["", "doctors", "appointments", "contactUs"]}
                  names={["Home", "Doctors", "Appointments", "Contact Us"]}
                />
              }
            >
              <Route path="" element={<ViewerHomepage />} />
              <Route
                path="doctors"
                element={<ViewerMainPage type="medical" />}
              />
              <Route path="contactUs" element={<ViewerContactForm />} />
              <Route path="doctors/:doctorId" element={<BlogDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
