import React, { useEffect, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import { useLocalStorageState } from "ahooks";
import BlogMain from "../../CommonComponnets/BlogMain";

const BusinessJobsPage = () => {
  const [template] = useLocalStorageState("template", "");
  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);

  const [main, setMain] = React.useState(false);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
      setLoading(false);
    }
  }, [dataToSend]);

  //
  const setDataForMain = (blocks, jobIds) => {
    console.log("jobIds", jobIds);
    setDataToSend({
      type: "business",
      page: "JobsPage",
      blocks,
      jobIds,
    });
  };

  useEffect(() => {
    setDataForMain(template?.pages?.JobsPage?.blocks, template?.data?.jobs);
  }, [template]);

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

export default BusinessJobsPage;
