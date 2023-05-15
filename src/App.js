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

//business Website
import AddJob from "../src/websites/businessWebsite/Pages/addJob/AddJob";
import ViewJobs from "../src/Viewer/BusinessWebsite/Pages/ViewJobs/ViewJobs";
import ApplyJob from "../src/Viewer/BusinessWebsite/Pages/ApplyJob/ApplyJob";
import ApplicationDetail from "../src/websites/businessWebsite/Pages/Applications/ApplicationDetail";
import JobDetail from "../src/websites/businessWebsite/Pages/JobDetail/JobDetail";

import JobApplications from "./Admin/JobApplications/JobApplications";

//medical Website
import MedicalViewerHomePage from "./Viewer/medicalWebsite/ MedicalViewerHomePage/MedicalViewerHomePage";
import DoctorsPage from "../src/websites/medicalWebsite/DoctorsPage/DoctorsPage";

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
import ManageBusinessWebsite from "./websites/businessWebsite/ManageWebsite/ManageWebsite";
import ManageEcommerceWebsite from "./websites/eccomerceWebsite/ManageWebsite/ManageWebsite";

import { ViewerLogin } from "./Viewer/medicalWebsite/ViewerLoginPage/LoginPage";
import NotFound from "./pages/NotFound/NotFound";
import { ViewerSignup } from "./Viewer/medicalWebsite/ViewerSignupPage/SignUpPage";
import { AuthorizeViewer } from "./middleware/AuthorizeViewer";
import { DoctorCard } from "./websites/medicalWebsite/newMedicalWebsite/DoctorCard";
import MedicalHomePage from "./websites/medicalWebsite/newMedicalWebsite/MedicalHomePage";
import MedicalDoctorPage from "./websites/medicalWebsite/newMedicalWebsite/MedicalDoctorPage";
import { DoctorDetail } from "./websites/medicalWebsite/newMedicalWebsite/DoctorDetail";
import ManageMedicalWebsite from "./websites/medicalWebsite/newMedicalWebsite/ManageWebsite/ManageWebsite";
import BookAppointment from "./Viewer/medicalWebsite/newMedicalWebsite/BookAppointment";
import { ViewAppointment } from "./websites/medicalWebsite/newMedicalWebsite/ManageWebsite/ViewAppointment";
import { CheckAppointment } from "./Viewer/medicalWebsite/newMedicalWebsite/ViewAppointment";
import ManageBlogWebsite from "./websites/blogWebsite/ManageWebsite/ManageBlogWebsite";
import AdminBlogDetail from "./websites/blogWebsite/BlogDetail/AdminBlogDetail";
import BlogDetail from "./Viewer/BlogWebsite/BlogDetail/BlogDetail";
import { ViewerDoctorDetail } from "./Viewer/medicalWebsite/newMedicalWebsite/ViewerDoctorDetail";

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
              {/*to be removed */}

              <Route path="/adminDoc" element={<DoctorCard />} />
              <Route path="/detail" element={<DoctorDetail />} />

              <Route path="/book" element={<BookAppointment />} />
              <Route path="/view" element={<ViewAppointment />} />
              <Route path="/check" element={<CheckAppointment />} />

              {/* //////////////// */}

              <Route
                path="/medicalviewerhomepage"
                element={<MedicalViewerHomePage></MedicalViewerHomePage>}
              />
              <Route path="/doctorspage" element={<DoctorsPage />} />

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

              <Route path="/loginpage" element={<ViewerLogin />} />
              <Route path="/signuppage" element={<ViewerSignup />} />
              <Route
                path="/viewerviewappointments"
                element={<ViewerViewAppointments></ViewerViewAppointments>}
              ></Route>

              <Route
                path="/adminviewappointments"
                element={<AdminViewAppointments></AdminViewAppointments>}
              ></Route>

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
              <Route path="/login" element={<Login />} />

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
                <Route path="blogs/:blogId" element={<AdminBlogDetail />} />
                <Route path="write" element={<Write />} />
                <Route path="manage" element={<ManageBlogWebsite />} />
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

              <Route
                path="blogs"
                element={
                  <AuthorizeViewer>
                    <ViewerMainPage type="blog" />
                  </AuthorizeViewer>
                }
              />
              <Route path="viewerLogin" element={<ViewerLogin />} />
              <Route path="viewerSignup" element={<ViewerSignup />} />
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
              <Route path="manage" element={<ManageEcommerceWebsite />} />
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
              <Route path="viewerLogin" element={<ViewerLogin />} />
              <Route path="viewerSignup" element={<ViewerSignup />} />
              <Route path="" element={<ViewerHomepage />} />
              <Route
                path="products"
                element={
                  <AuthorizeViewer>
                    <ViewerMainPage type="eccomerce" />
                  </AuthorizeViewer>
                }
              />
              <Route
                path="cart"
                element={
                  <AuthorizeViewer>
                    <CartPage />
                  </AuthorizeViewer>
                }
              />
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
              <Route path="manage" element={<ManageBusinessWebsite />} />
              <Route path="manage/:jobId" element={<JobDetail />} />

              {/* <Route path="applications" element={<BussinessApplicationsPage />} /> */}
              {/* <Route path="products" element={<BussinessContactUsPage />} />*/}
            </Route>

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
              <Route path="viewerLogin" element={<ViewerLogin />} />
              <Route path="viewerSignup" element={<ViewerSignup />} />
              <Route path="" element={<ViewerHomepage />} />
              <Route
                path="jobs"
                element={
                  <AuthorizeViewer>
                    <ViewerMainPage type="business" />
                  </AuthorizeViewer>
                }
              />

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
              <Route path="" element={<MedicalHomePage />} />
              {/* <Route path="doctors" element={<DoctorsPage />} /> */}
              <Route path="doctors" element={<MedicalDoctorPage />} />
              <Route
                path="doctors/:doctorId"
                element={<DoctorDetail view="none" />}
              />
              <Route path="manage" element={<ManageMedicalWebsite />} />
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
              <Route path="viewerLogin" element={<ViewerLogin />} />
              <Route path="viewerSignup" element={<ViewerSignup />} />
              <Route path="" element={<ViewerHomepage />} />
              <Route
                path="doctors"
                element={
                  // <AuthorizeViewer>
                  //   <ViewerMainPage type="medical" />
                  // </AuthorizeViewer>
                  <ViewerMainPage type="medical" />
                }
              />
              <Route path="contactUs" element={<ViewerContactForm />} />
              <Route
                path="doctors/:doctorId/appointment"
                element={<BookAppointment />}
              />
              <Route
                path="doctors/:doctorId"
                element={<ViewerDoctorDetail />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
