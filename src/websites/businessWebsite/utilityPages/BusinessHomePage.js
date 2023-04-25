import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../CommonComponnets/Main";
import { useTemplateData } from "../../../customHooks/useTemplateData";
import { businessTemplate } from "../../../TemplatesData/businessTemplate";

const BusinessHomePage = () => {
  const { loading, dataToSend } = useTemplateData(
    "business",
    businessTemplate,
    "BusinessHomePage",
    "JobsPage",
    "jobs"
  );

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
        <Main data={dataToSend} />
      )}
    </>
  );
};

export default BusinessHomePage;
