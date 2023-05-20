import axios from "axios";
import { mapAdminBlocks, mapViewerBlocks } from "./helperFunctions";
export const getUserData = async (username) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/templates/getTemplates",
      { username }
    );

    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err; // rethrow the error to be caught by the caller
  }
};

export const getUserPublishedWebsites = async (username) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/templates/getpublishedwebsites",
      { username }
    );

    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err; // rethrow the error to be caught by the caller
  }
};


export const getTemplateData = async (templateId) => {
  console.log("templateId", templateId);
  try {
    const res = await axios.get(
      `http://localhost:8800/api/templates/getTemplate/${templateId}`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err; // rethrow the error to be caught by the caller
  }
};

export const fetchAdminBlocks = async (blockIds) => {
  try {
    const res = await axios.post("http://localhost:8800/api/blocks/get", {
      blockIds,
    });
    const fetchedBlocks = res.data.Blocks;
    console.log("3.in fetchAdminBlocks in axiosFunctions.js", fetchedBlocks);

    return fetchedBlocks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchViewerBlocks = async (blockIds) => {
  try {
    const res = await axios.post("http://localhost:8800/api/blocks/get", {
      blockIds,
    });
    const fetchedBlocks = res.data.Blocks;
    console.log("fetchedBlocks", fetchedBlocks);
    return fetchedBlocks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
{
  /* Ecommerce Template */
}
export const getListOfProducts = async (productIds) => {
  try {
    const res = await axios.post("http://localhost:8800/api/products/get", {
      productIds,
    });
    const fetchedProducts = res.data.Products;
    return fetchedProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

{
  /* Blog Template */
}
export const addBookmark = async (userId, blogId) => {
  try {
    const response = await axios.post(
      `http://localhost:8800/api/blogs/bookmark/${blogId}`,
      { userId }
    );

    return response.data;
    // handle success response
  } catch (error) {
    return error;

    // handle error
  }
};
export const getBookmarkedBlogs = async (userId) => {
  try {
    const response = await axios.post(
      `http://localhost:8800/api/blogs/bookmarkedBlogs`,
      { userId }
    );

    return response.data;
    // handle success response
  } catch (error) {
    return error;

    // handle error
  }
};

export const getBlog = async (blogId) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/blogs/${blogId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getBlogsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/blogs/category/${category}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addReview = async (blogId, name, email, comment) => {
  try {
    const response = await axios.post(
      `http://localhost:8800/api/blogs/${blogId}/review`,
      { name, email, comment }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
