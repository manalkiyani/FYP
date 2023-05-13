import React from "react";
import { useEffect } from "react";

import BlogMain from "../../CommonComponnets/BlogMain";

import BeatLoader from "react-spinners/BeatLoader";
import { useLocalStorageState } from "ahooks";
const MedicalDoctorPage = () => {
  const [template] = useLocalStorageState("template", "");
  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);

  const [main, setMain] = React.useState(false);

  const setDataForMain = (blocks, doctorIds) => {
    setDataToSend({
      type: "medical",
      page: "DoctorsPage",
      blocks, 
      doctorIds,
    });
  };
  useEffect(() => {
    setDataForMain(template?.pages?.DoctorsPage?.blocks, template?.data?.doctors);
  }, [template]);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
      setLoading(false);
    }
  }, [dataToSend]);

  return (
    <>
      {main ? (
        <BlogMain data={dataToSend} />
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

export default MedicalDoctorPage;
