import React, { useEffect } from "react";
import { getUserData } from "../../authentication/authFunctions";

const SavedTemplates = () => {
  const [savedTemplates, setSavedTemplates] = React.useState(null);

  useEffect(() => {
    console.log("savedTemplates");
    getsavedTemplates()
      .then((data) => {
        console.log(data)
        // setSavedTemplates(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getsavedTemplates = async () => {
    const data = await getUserData();
    return data;
  };
  return (
    <div>
      {savedTemplates && savedTemplates.map((template) => {
        <div>
          <h1>{template.name}</h1>
          <p>{template.type}</p>
        </div>;
      })}
    </div>
  );
};

export default SavedTemplates;
