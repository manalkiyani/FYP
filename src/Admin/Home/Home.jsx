import Sidebar from "../components/sidebar/Sidebar";
import "./home.scss";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table"
import AvailableTemplate from "../components/availableTemplates/availableTemplate";



const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
          <Featured />

        </div>
        <div style={{marginTop:'20px'}}>
        Available Templates
        <div className="charts">
        <AvailableTemplate  title='Ecommerce' description='An eCommerce template is a pre-designed framework for creating an online store. It includes ready-made pages and features that can be customized to fit specific needs. This saves time and effort'></AvailableTemplate>
          <AvailableTemplate  title='Blog' description = 'A blog template is a pre-designed framework for creating a blog. It includes ready-made pages and features that can be customized to fit specific needs. This makes it easier and quicker to launch a blog.'></AvailableTemplate>
          <AvailableTemplate  title='Medical' description = 'A medical template is a pre-designed framework for creating a website related to healthcare or medical services. It includes ready-made pages and features that can be customized to fit specific needs'></AvailableTemplate>
          <AvailableTemplate  title='Business' description = 'A business template is a pre-designed framework for creating a website related to a company or organization. It includes ready-made pages and features that can be customized to fit specific needs'></AvailableTemplate>

        </div>

        </div>

        <div  style={{marginTop:'20px'}}>
        Saved Templates
        <div className="charts">
        <AvailableTemplate  title='Ecommerce' description='An eCommerce template is a pre-designed framework for creating an online store. It includes ready-made pages and features that can be customized to fit specific needs. This saves time and effort'></AvailableTemplate>
          <AvailableTemplate  title='Blog' description = 'A blog template is a pre-designed framework for creating a blog. It includes ready-made pages and features that can be customized to fit specific needs. This makes it easier and quicker to launch a blog.'></AvailableTemplate>
          <AvailableTemplate  title='Medical' description = 'A medical template is a pre-designed framework for creating a website related to healthcare or medical services. It includes ready-made pages and features that can be customized to fit specific needs'></AvailableTemplate>
          <AvailableTemplate  title='Business' description = 'A business template is a pre-designed framework for creating a website related to a company or organization. It includes ready-made pages and features that can be customized to fit specific needs'></AvailableTemplate>

        </div>

        </div>



        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
