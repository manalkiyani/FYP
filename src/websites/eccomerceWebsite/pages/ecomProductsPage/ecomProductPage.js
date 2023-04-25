import React, { useEffect, useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import BlogMain from "../../../CommonComponnets/BlogMain";
import { useLocalStorageState } from "ahooks";

const EcomProductsPage = () => {
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
  const setDataForMain = (blocks, productIds) => {
    setDataToSend({
      type: "eccomerce",
      page: "ProductsPage",
      blocks,
      productIds,
    });
  };

  useEffect(() => {
    setDataForMain(
      template?.pages?.ProductsPage?.blocks,
      template?.data?.products
    );
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

export default EcomProductsPage;
