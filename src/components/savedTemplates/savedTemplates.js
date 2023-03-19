import React, { useEffect } from "react";
import { getUserData } from "../../utilityFunctions/axiosFunctions";
import { getUsername } from "../../utilityFunctions/authFunctions";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

import classes from "./savedTemplates.module.css";
const SavedTemplates = () => {
  const [savedTemplates, setSavedTemplates] = React.useState(null);
  const { setTemplateId, setTemplate } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getsavedTemplates();
  }, []);

  const getsavedTemplates = async () => {
    try {
      const { username } = await getUsername();
      const user = await getUserData(username);

      setSavedTemplates(user.savedTemplates);
    } catch (error) {
      console.log(error);
    }
  };

  const openAsViewer = (id, type) => {
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });
    setTemplateId(id);

    navigate(`/view/${type}/template/${id}`);
  };
  const openAsAdmin = (id, type) => {
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });
    setTemplateId(id);

    navigate(`/${type}/template/${id}`);
  };
  return (
    <div className={classes.flex}>
      {savedTemplates &&
        savedTemplates.map((template) => {
          return (
            <div key={template._id} className={classes.card}>
              <div onClick={() => openAsAdmin(template._id, template.type)}>
                <h1>{template.name}</h1>
                <p>Edit {template.type} Template</p>
              </div>

              <p onClick={() => openAsViewer(template._id, template.type)}>
                View as others
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default SavedTemplates;
