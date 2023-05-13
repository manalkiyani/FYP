import React, { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../CommonComponnets/Main";

import { useTemplateData } from "../../../customHooks/useTemplateData";
import { blogTemplate } from "../../../TemplatesData/blogTemplate";

const BlogHomePage = () => {
  const { loading, dataToSend } = useTemplateData(
    "blog",
    blogTemplate,
    "BlogHomePage",
    "BlogsPage",
    "blogs"
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

export default BlogHomePage;
