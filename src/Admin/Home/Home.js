import Sidebar from "../components/sidebar/Sidebar";
import "./home.scss";
import Featured from "../components/featured/Featured";

import AvailableTemplate from "../components/availableTemplates/availableTemplate";
import SavedTemplates from "../components/savedTemplates/savedTemplates";
import { Flex, Space, Text, Title } from "@mantine/core";
import BlankTemplates from "../components/blankTemplates";
import PublishedWebsites from "../components/publishedWebsites/publishedWebsites";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="charts">
          <Featured />
        </div>
        <div>
          <div>
            <Flex
              mt="sm"
              mb="sm"
              justify="space-between"
              mih={50}
              style={{ padding: "20px", borderRadius: "20px" }}
              bg="#FBF8F1"
            >
              <Title fw={400} order={2}>
                Pick the Website Template You Love
              </Title>
            </Flex>
            <div
              style={{
                width: "80vw",
                display: "flex",
              }}
              className="charts"
            >
              <AvailableTemplate
                id="001"
                type="blog"
                img="https://res.cloudinary.com/djlewzcd5/image/upload/v1679227053/WhatsApp_Image_2023-03-19_at_4.57.17_PM_ewpmih.jpg"
                title="Blog Template"
                description="A blog template is a pre-designed framework for creating a blog.  This makes it easier and quicker to launch a blog."
              ></AvailableTemplate>
              <AvailableTemplate
                id="002"
                type="eccomerce"
                img="https://res.cloudinary.com/djlewzcd5/image/upload/v1679226873/WhatsApp_Image_2023-03-19_at_1.34.27_PM_1_h8los5.jpg"
                title="Eccomerce Template"
                description="An eCommerce template is a pre-designed framework for creating an online store.  This saves time and effort"
              ></AvailableTemplate>
              <AvailableTemplate
                id="003"
                type="medical"
                img="https://res.cloudinary.com/djlewzcd5/image/upload/v1679226870/WhatsApp_Image_2023-03-19_at_1.34.28_PM_qgxil7.jpg"
                title="Medical Template"
                description="A medical template is a pre-designed framework for creating a website related to healthcare or medical services."
              ></AvailableTemplate>
              <AvailableTemplate
                id="004"
                type="business"
                img="https://res.cloudinary.com/djlewzcd5/image/upload/v1679227944/WhatsApp_Image_2023-03-19_at_5.06.38_PM_oxaeio.jpg"
                title="Business Template"
                description="A business template is a pre-designed framework for creating a website related to a company or organization"
              ></AvailableTemplate>
            </div>
          </div>
        </div>

        <div>
          <Flex
            mt="sm"
            mb="sm"
            justify="space-between"
            mih={50}
            style={{ padding: "20px", borderRadius: "20px" }}
            bg="#FBF8F1"
          >
            <Title fw={400} order={2}>
              Blank Templates
            </Title>
          </Flex>
          <div className="charts">
            <BlankTemplates />
          </div>
        </div>

        <div>
          <Flex
            mt="xl"
            mb="md"
            justify="space-between"
            mih={50}
            style={{ padding: "20px", borderRadius: "20px" }}
            bg="#FBF8F1"
          >
            <Title fw={400} order={2}>
              Templates you worked on
            </Title>
          </Flex>

          <div className="charts">
            <SavedTemplates />
          </div>
        </div>


        <div>
          <Flex
            mt="xl"
            mb="md"
            justify="space-between"
            mih={50}
            style={{ padding: "20px", borderRadius: "20px" }}
            bg="#FBF8F1"
          >
            <Title fw={400} order={2}>
              Published Templates
            </Title>
          </Flex>

          <div className="charts">
      <PublishedWebsites></PublishedWebsites>
          </div>
        </div>
        <Space h="xl" />
      </div>
    </div>
  );
};

export default Home;
