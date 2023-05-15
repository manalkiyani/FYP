import { useEffect, useState } from "react";
import { createStyles, Table, ScrollArea, rem, Button } from "@mantine/core";
import { useLocalStorageState } from "ahooks";
import axios from "axios";
import ReplyForm from "../../Admin/ReplyForm/ReplyForm";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export function Messages() {
  const [data, setData] = useState([]);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [templateId, setTemplateId] = useLocalStorageState("templateId");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    getMessages();
  }, []);
  const handleReply = async (email) => {
    setEmail(email);

    setOpen(true);
  };
  const getMessages = async () => {
    if (
      templateId === "001" ||
      templateId === "002" ||
      templateId === "003" ||
      templateId === "004"
    )
      return;
    try {
      const response = await axios.get(
        `http://localhost:8800/api/admin/getMessages/${templateId}`
      );

      setData(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };
  const rows = data.map((row) => (
    <tr key={row.subject}>
      <td>{row.subject}</td>
      <td>{row.email}</td>
      <td>{row.message}</td>
      <td>
        <Button
          onClick={() => handleReply(row.email)}
          style={{ color: "#40AFC0" }}
          variant="subtle"
        >
          Reply
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>subject</th>
              <th>Email</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      {open && (
        <ReplyForm email={email} open={open} setOpen={setOpen}></ReplyForm>
      )}
    </>
  );
}
