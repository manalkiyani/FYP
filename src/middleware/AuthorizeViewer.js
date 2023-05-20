import { Navigate } from "react-router-dom";
import { getTemplateId } from "../utilityFunctions/TemplateIdController";
import { useEffect, useState } from "react";
import { getWebsiteData } from "../utilityFunctions/websiteDataController";

export const AuthorizeViewer = ({ children }) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState(true);
  const currentPath = window.location.pathname;
  const parentPath = currentPath.split("/").slice(0, -1).join("/");
  console.log(`Parent path: ${parentPath}`);

  useEffect(() => {
    fetchTemplateId();
  });

  const fetchTemplateId = async () => {
    const Template = await getTemplateId();
    const response = await getWebsiteData(Template.templateId);
    console.log("response in Authorize Viewer", response.status);
    if (response.status === "200") {
      console.log("in if");
      // Website data found
      setShouldRenderChildren(true);
    } else {
      console.log("in elsed");
      // Website data not found
      setShouldRenderChildren(false);
    }
  };

  return shouldRenderChildren ? (
    children
  ) : (
    <Navigate to={parentPath + "/viewerLogin"} replace={true} />
  );
};
