import React, { useEffect } from "react";
import { getUserData } from "../../utilityFunctions/axiosFunctions";
import { getUsername } from "../../utilityFunctions/authFunctions";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

const SavedTemplates = () => {
  const [savedTemplates, setSavedTemplates] = React.useState(null);
  const { setTemplateId } = useContext(UserContext);
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
    setTemplateId(id);

    navigate(`view/${type}/template/${id}`);
  };
    const openAsAdmin = (id, type) => {
    setTemplateId(id);

    navigate(`/${type}/template/${id}`);
  };
  return (
    <div>
      {savedTemplates &&
        savedTemplates.map((template) => {
          return (
            <div key={template._id} style={{ backgroundColor: "red" }}>
              <div onClick={() => openAsAdmin(template._id, template.type)}>
                <h1>{template.name}</h1>
                <p>{template.type}</p>
              </div>

              <p onClick={() => openAsViewer(template._id, template.type)}>View as others</p>
            </div>
          );
        })}
    </div>
  );
};

export default SavedTemplates;
