import React from "react";
import Profile from "../../components/Profile/Profile";
import Template from "../../components/Templates/Template";

const Dashboard = () => {
  const templates = [
    {
      key: 1,
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Blog Template",
      description: "A simple blog template with a sidebar and a header image.",
      type: "blog",
    },
    {
      key: 2,
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Eccomerce Template",
      description:
        "A simple eccomerce template with a sidebar and a header image.",
      type: "eccomerce",
    },
    {
      key: 3,
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Medical Template",
      description:
        "A simple eccomerce template with a sidebar and a header image.",
      type: "medical",
    },
    {
      key: 4,
      img: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg",
      title: "Business Template",
      description:
        "A simple eccomerce template with a sidebar and a header image.",
      type: "business",
    },
  ];

  return (
    <div>
      <Profile />
      <Template data={templates}></Template>
    </div>
  );
};

export default Dashboard;
