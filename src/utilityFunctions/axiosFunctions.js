import axios from "axios";
import { mapBlocks } from "./helperFunctions";
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
export const fetchBlocks = async (blockIds) => {
  try {
    const res = await axios.post("http://localhost:8800/api/blocks/get", {
      blockIds,
    });
    const fetchedBlocks = res.data.Blocks;

    const blocks = mapBlocks(fetchedBlocks);
    console.log(blocks);
    return blocks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

