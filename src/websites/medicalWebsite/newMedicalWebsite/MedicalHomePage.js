import React, { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../CommonComponnets/Main";

import { useTemplateData } from "../../../customHooks/useTemplateData";
import { medicalTemplate } from "../../../TemplatesData/medicalTemplate";

const MedicalHomePage = () => {
  const { loading, dataToSend } = useTemplateData(
    "medical",
    medicalTemplate,
    "MedicalHomePage",
    "DoctorsPage",
    "doctors"
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

export default MedicalHomePage;
