import axios from "axios";

// Function to fetch website data
export const getWebsiteData = async (id) => {
  try {
    const response = await axios.get(`/api/websiteData/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching website data:", error);
    throw error;
  }
};

// Function to add website data
export const addWebsiteData = async (templateId, viewerId) => {
  try {
    const response = await axios.post("/api/websiteData", {
      templateId,
      viewerId,
    });
    console.log("Added website data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding website data:", error);
    throw error;
  }
};

// Function to delete website data
export const deleteWebsiteData = async (id) => {
  try {
    const response = await axios.delete(`/api/websiteData/${id}`);
    console.log("Deleted website data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting website data:", error);
    throw error;
  }
};
