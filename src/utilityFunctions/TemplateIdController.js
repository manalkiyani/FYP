import axios from "axios";

// Function to get website data
export const getTemplateId = async () => {
  try {
    const response = await axios.get("/api/templateId");
    return response.data;
  } catch (error) {
    console.error("Error getting website data:", error);
    throw error;
  }
};

// Function to add website data
export const addTemplateId = async (templateId, type) => {
  try {
    const response = await axios.post("/api/templateId", {
      templateId,
      type,
    });
    console.log("Added website data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding website data:", error);
    throw error;
  }
};

// Function to update website data
export const updateTemplateId = async (id, templateId, type) => {
  try {
    const response = await axios.put(`/api/templateId/${id}`, {
      templateId,
      type,
    });
    console.log("Updated website data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating website data:", error);
    throw error;
  }
};

// Function to delete website data
export const deleteTemplateId = async (id) => {
  try {
    const response = await axios.delete(`/api/templateId/${id}`);
    console.log("Deleted website data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting website data:", error);
    throw error;
  }
};
