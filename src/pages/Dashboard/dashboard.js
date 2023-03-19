import React from "react";
import Profile from "../../components/Profile/Profile";
import Template from "../../components/Templates/Template";
import SavedTemplates from "../../components/savedTemplates/savedTemplates";

const Dashboard = () => {
  const templates = [
    {
      id: "001",
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Blog Template",
      description: "A simple blog template with a sidebar and a header image.",
      type: "blog",
    },
    {
      id: "002",
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Eccomerce Template",
      description:
        "A simple eccomerce template with a sidebar and a header image.",
      type: "eccomerce",
    },
    {
      id: "003",
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Medical Template",
      description:
        "A simple eccomerce template with a sidebar and a header image.",
      type: "medical",
    },
    {
      id: "004",
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Business Template",
      description:
        "A simple eccomerce template with a sidebar and a header image.",
      type: "business",
    },
  ];

  return (
    <div style={{padding:'30px'}}>
      <Profile />
      <h3>Available Templates</h3>
      <Template data={templates}></Template>
      <h3>Saved Templates</h3>
      <SavedTemplates />
    </div>
  );
};

export default Dashboard;
