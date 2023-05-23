const handleButtonClick = async (link, navigate, type, templateId) => {
  console.log("in handle");
  console.log(type,templateId)
  if (type && templateId) {
    if (link) {
      console.log(link);
      if (link?.page !== "") {
        navigate(`/view/${type}/template/${templateId}/${link.page}`);
      } else if (link?.url !== "") {
        window.open(link.url, "_blank");
      } else if (link?.detail !== "") {
        let page = "";
        switch (type) {
          case "blog":
            page = "blogs";
            break;
          case "medical":
            page = "doctors";
            break;
          case "business":
            page = "jobs";
            break;
          case "ecommerce":
            page = "products";
            break;
        }
        navigate(`/view/${type}/template/${templateId}/${page}/${link.detail}`);
      }
    }
  }
};

export default handleButtonClick;
