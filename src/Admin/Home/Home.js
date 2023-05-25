import Sidebar from "../components/sidebar/Sidebar";
import "./home.scss";
import Featured from "../components/featured/Featured";

import AvailableTemplate from "../components/availableTemplates/availableTemplate";
import SavedTemplates from "../components/savedTemplates/savedTemplates";
import { Flex, Space, Text, Title } from "@mantine/core";
import BlankTemplates from "../components/blankTemplates";
import PublishedWebsites from "../components/publishedWebsites/publishedWebsites";
import { FavTemplates } from "../components/FavTemplates";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="charts">
          <Featured />
        </div>

        <FavTemplates />

        <BlankTemplates />

        <SavedTemplates />

        <PublishedWebsites></PublishedWebsites>

        <Space h="xl" />
      </div>
    </div>
  );
};

export default Home;
