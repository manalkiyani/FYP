import React from "react";

import DisplayBlocks from "../../Components/displayBlocks/displayBlocks";

import BeatLoader from "react-spinners/BeatLoader";
import useViewerTemplateData from "../../../customHooks/useViewerTemplateData";

const ViewerHomepage = ({ page }) => {
  const { loading, dataToSend } = useViewerTemplateData(page);
  return (
    <>
      {loading ? (
        <center>
          <BeatLoader
            color={"#7890A3"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </center>
      ) : (
        <DisplayBlocks data={dataToSend} />
      )}
    </>
  );
};

export default ViewerHomepage;
