import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

import DisplayBlocks from "../../Components/displayBlocks/displayBlocks";
import {
  fetchViewerBlocks,
  getTemplateData,
} from "../../../utilityFunctions/axiosFunctions";
import Blogs from "../components/Blogs/Blogs";
import ViewerProducts from "../../EccomerceWebsite/pages/ProductPage/ViewerProductPage";
import { cloneDeep } from "lodash";
import { mapViewerBlocks } from "../../../utilityFunctions/helperFunctions";
import ViewJobs from "../../BusinessWebsite/Pages/ViewJobs/ViewJobs";
import ViewerDoctorPage from "../../medicalWebsite/newMedicalWebsite/ViewerDoctorPage";

const ViewerMainPage = (props) => {
  const { id } = useParams();
  const [blogIds, setBlogIds] = React.useState(null);
  const [productIds, setProductIds] = React.useState(null);
  const [jobIds, setJobIds] = React.useState(null);
  const [doctorIds, setDoctorIds] = React.useState(null);

  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);

  const [main, setMain] = React.useState(false);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
      setLoading(false);
    }
  }, [dataToSend]);

  const loadSavedTemplate = async () => {
    let MainPageBlocks = [];
    let DataIds = [];
    try {
      const Template = await getTemplateData(id);

      switch (props.type) {
        case "blog":
          {
            if (Template.pages?.BlogsPage?.blocks) {
              MainPageBlocks = await fetchViewerBlocks(
                Template.pages.BlogsPage.blocks
              );
              const copy = cloneDeep(MainPageBlocks);
              MainPageBlocks = await mapViewerBlocks(copy);
            }
            if (Template.data?.blogs) {
              DataIds = Template.data.blogs;
            }
            setBlogIds(DataIds);
          }
          break;
        case "eccomerce":
          {
            if (Template.pages?.ProductsPage?.blocks) {
              MainPageBlocks = await fetchViewerBlocks(
                Template.pages.ProductsPage.blocks
              );

              const copy = cloneDeep(MainPageBlocks);
              MainPageBlocks = await mapViewerBlocks(copy);
            }
            if (Template.data?.products) {
              DataIds = Template.data.products;
            }
            setProductIds(DataIds);
          }
          break;
        case "business":
          {
            if (Template.pages?.JobsPage?.blocks) {
              MainPageBlocks = await fetchViewerBlocks(
                Template.pages.JobsPage.blocks
              );

              const copy = cloneDeep(MainPageBlocks);
              MainPageBlocks = await mapViewerBlocks(copy);
            }
            if (Template.data?.jobs) {
              DataIds = Template.data.jobs;
            }
            setJobIds(DataIds);
          }
          break;
        case "medical":
          {
            if (Template.pages?.DoctorsPage?.blocks) {
              MainPageBlocks = await fetchViewerBlocks(
                Template.pages.DoctorsPage.blocks
              );

              const copy = cloneDeep(MainPageBlocks);
              MainPageBlocks = await mapViewerBlocks(copy);
            }
            if (Template.data?.doctors) {
              DataIds = Template.data.doctors;
            }
            setDoctorIds(DataIds);
          }
          break;
      }

      setDataToSend({ blocks: MainPageBlocks });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadSavedTemplate();
  }, []);

  return (
    <>
      {/*display blogs here*/}
      {blogIds && <Blogs blogIds={blogIds} />}
      {/*display products here*/}
      {productIds && <ViewerProducts productIds={productIds} />}

      {jobIds && <ViewJobs jobIds={jobIds} />}


      {doctorIds && <ViewerDoctorPage doctorIds={doctorIds} />}

      {/*display blocks here*/}
      {main ? (
        <DisplayBlocks data={dataToSend} />
      ) : (
        <center>
          <BeatLoader
            color={"#7890A3"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </center>
      )}
    </>
  );
};

export default ViewerMainPage;
