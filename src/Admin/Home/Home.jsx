import Sidebar from "../components/sidebar/Sidebar";
import "./home.scss";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table"
import AvailableTemplate from "../components/availableTemplates/availableTemplate";
import SavedTemplates from "../components/savedTemplates/savedTemplates";


const templates = [
    {
      id: '001',
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Blog Template",
      description: "A blog template is a pre-designed framework for creating a blog.  This makes it easier and quicker to launch a blog.",
      type: "blog",
    },
    {
      id: '002',
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Eccomerce Template",
      description:
       "An eCommerce template is a pre-designed framework for creating an online store.This saves time and effort",
      type: "eccomerce",
    },
    {
      id: '003',
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Medical Template",
      description:
        "A medical template is a pre-designed framework for creating a website related to healthcare or medical services.",
      type: "medical",
    },
    {
      id: '004',
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Business Template",
      description:
       "A business template is a pre-designed framework for creating a website related to a company or organization..",
        
      type: "business",
    },
  ];
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
          <Featured />

        </div>
        <div  >
        <div className='container'>
      <p className='AvailableTemplatesHeader'>Pick the Website Template You Love</p>
        <div className="charts">
       
          <AvailableTemplate id= '001'   type= "blog" img= "https://res.cloudinary.com/djlewzcd5/image/upload/v1679227053/WhatsApp_Image_2023-03-19_at_4.57.17_PM_ewpmih.jpg" title= "Blog Template" description = 'A blog template is a pre-designed framework for creating a blog.  This makes it easier and quicker to launch a blog.'></AvailableTemplate>
          <AvailableTemplate id= '002'  type= "eccomerce"    img= "https://res.cloudinary.com/djlewzcd5/image/upload/v1679226873/WhatsApp_Image_2023-03-19_at_1.34.27_PM_1_h8los5.jpg"  title= "Eccomerce Template" description='An eCommerce template is a pre-designed framework for creating an online store.  This saves time and effort'></AvailableTemplate>
          <AvailableTemplate id= '003'  type= "medical"    img= "https://res.cloudinary.com/djlewzcd5/image/upload/v1679226870/WhatsApp_Image_2023-03-19_at_1.34.28_PM_qgxil7.jpg"  title= "Medical Template" description='A medical template is a pre-designed framework for creating a website related to healthcare or medical services.'></AvailableTemplate>
          <AvailableTemplate id= '004'   type= "business" img= "https://res.cloudinary.com/djlewzcd5/image/upload/v1679227944/WhatsApp_Image_2023-03-19_at_5.06.38_PM_oxaeio.jpg" title= "Business Template" description = 'A business template is a pre-designed framework for creating a website related to a company or organization'></AvailableTemplate>
          
        </div>
        </div>
         </div>

        <div >
       <p className='AvailableTemplatesHeader'>Templates You Worked On</p>
        <div className="charts">
     < SavedTemplates/>
        </div>

        </div>



      </div>
    </div>
  );
};

export default Home;
