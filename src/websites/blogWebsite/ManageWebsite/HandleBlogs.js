import React from "react";
import { Flex, Text, Button, Space } from "@mantine/core";

import Add from "@mui/icons-material/ControlPointOutlined";
import { Toaster, toast } from "react-hot-toast";

import { useLocalStorageState } from "ahooks";
import Write from "../WritePage/Write";
import Blogs from "../components/Blogs/Blogs";


const HandleBlogs = () => {
  const [addBlog, setAddBlog] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [operation, setOperation] = React.useState("add");
  const [blogIds, setBlogIds] = React.useState([]);
  const [template] = useLocalStorageState("template", "");

  React.useEffect(() => {
    console.log("in effect");
    console.log(template);
    setBlogIds(template?.data?.blogs);
  }, []);

  const handleEditBlog = (id) => {
    console.log(id, "handleEdtiProduct");
    setAddBlog(true);
    setOperation("edit");
    setEditId(id);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      {addBlog && (
        <Write
          operation={operation}
          editId={editId}
          setAddBlog={setAddBlog}
        />
      )}
      <Space h="lg" />
      <Flex
        justify="space-between"
        mih={50}
        style={{ padding: "20px", borderRadius: "20px" }}
        bg="#FBF8F1"
      >
        <Text fw={400} fz="xl">
          Manage Blogs
        </Text>
        {!addBlog && (
          <Button
            onClick={() => setAddBlog(true)}
            variant="default"
            leftIcon={<Add size="1rem" />}
          >
            ADD NEW
          </Button>
        )}
      </Flex>

      <Space h="xl" />
      <Flex direction="column">
        <Blogs
          handleEditBlog={handleEditBlog}
          blogIds={blogIds}
        />
      </Flex>
    </>
  );
};

export default HandleBlogs;
