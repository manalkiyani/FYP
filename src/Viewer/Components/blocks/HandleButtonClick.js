
const handleButtonClick = (link,navigate) => {
  
  const template = JSON.parse(localStorage.getItem("viewerTemplate"));

  if (link) {
    if (link?.page !== "") {
      navigate(`/view/${template.type}/template/${template.id}/${link.page}`);
    

    } else if (link?.url !== "") {
      window.open(link.url, "_blank");
    } else if (link?.detail !== "") {
      let page = "";
      switch (template.type) {
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
      navigate(
        `/view/${template.type}/template/${template.id}/${page}/${link.detail}`
      );
    }
  }
};

export default handleButtonClick;
