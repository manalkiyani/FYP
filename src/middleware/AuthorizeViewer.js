import { Navigate, useParams } from "react-router-dom";

export const AuthorizeViewer = ({ children }) => {
  const viewerTemplateId = JSON.parse(localStorage.getItem("viewerTemplateId"));
  const currentPath = window.location.pathname;
  const parentPath = currentPath.split("/").slice(0, -1).join("/");
  console.log(`Parent path: ${parentPath}`);
  const { id } = useParams();

  if (id !== viewerTemplateId) {
    return (
      <Navigate to={parentPath + "/viewerLogin"} replace={true}></Navigate>
    );
  }

  return children;
};
