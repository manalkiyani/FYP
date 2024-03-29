import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { createStyles, Title, Container, rem, Flex } from "@mantine/core";
import {
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { getUsername, getUser } from "../../../utilityFunctions/authFunctions";
import {
  getUserData,
  getUserPublishedWebsites,
} from "../../../utilityFunctions/axiosFunctions";
import { useLocalStorageState } from "ahooks";
import { Button, Group, Text } from "@mantine/core";

import { addTemplateId } from "../../../utilityFunctions/TemplateIdController";
const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(80),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: "#7B64FF",
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));
export default function PublishedWebsites() {
  const [DeleteId, setDeleteId] = React.useState(null);
  const [publishedTemplates, setPublishedTemplates] = React.useState(null);
  const [template, setTemplate] = useLocalStorageState("template", "");
  const [templateId, setTemplateId] = useLocalStorageState("templateId", "");
  const [viewerTemplate, setViewerTemplate] = useLocalStorageState(
    "viewerTemplate",
    {}
  );
  const { classes } = useStyles();
  // const { setTemplateId, setTemplate } = useContext(UserContext);
  const [updated, setUpdated] = React.useState(false);

  const navigate = useNavigate();
  const [Deletion, setDeletion] = useState(false);

  const openDeletion = (id) => {
    console.log(id);
    setDeleteId(id);
    setDeletion(true);
  };

  const closeDeletion = () => {
    setDeletion(false);
  };
  useEffect(() => {
    getsavedTemplates();
  }, [updated]);

  const getsavedTemplates = async () => {
    try {
      const { username } = await getUsername();
      const user = await getUserPublishedWebsites(username);

      setPublishedTemplates(user.publishedwebsites);
    } catch (error) {
      console.log(error);
    }
  };

  const openAsViewer = async (id, type) => {
    // setTemplate({
    //   type: "",
    //   pages: {},
    //   data: {},
    // });
    // setTemplateId(id);
    // setViewerTemplate(
    //  { id,type}
    // )
    const response = await addTemplateId(id, type);
    console.log(response);

    navigate(`/view/${type}/template/${id}`);
  };

  const openAsPublished = async (subdomainGot, id, type) => {
    //get subdomain in function arguments as well and put in URL
    try {
      const response = await addTemplateId(id, type);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.href = `http://${subdomainGot}.localhost:3000/view/${type}/template/${id}`;

    // navigate(`/view/${type}/template/${id}`);
  };

  const openAsAdmin = (id, type) => {
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });
    setTemplateId(id);

    navigate(`/${type}/template/${id}`);
  };
  const getUserId = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };
  const deleteTemplate = async () => {
    const data = await getUserId();
    await axios
      .delete(`http://localhost:8800/api/templates/${data._id}/${DeleteId}`)
      .then((response) => {
        console.log(response.data);
        setUpdated(!updated);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const images = [
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469821/pexels-antoni-shkraba-4348404_estoi2.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469821/pexels-marcelo-chagas-2183773_viqmun.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469816/pexels-ketut-subiyanto-4126724_iwqzw6.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469810/pexels-picjumbocom-196655_zaquiv.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469810/pexels-pixabay-35550_rqrxk6.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469816/pexels-cottonbro-studio-5082579_go4zvq.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470618/pexels-negative-space-177557_i2eqgf.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470614/pexels-burst-374016_zy540g.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470611/pexels-cottonbro-studio-3584931_jeq1ks.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470598/pexels-kaboompics-com-6168_i3zd5p.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470595/pexels-pixabay-265667_jtfquj.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470592/pexels-startup-stock-photos-7356_yo3msx.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469816/pexels-ketut-subiyanto-4126724_iwqzw6.jpg",
  ];

  // <>
  //   <ConfirmDeleteDialog
  //     open={Deletion}
  //     onClose={closeDeletion}
  //     onConfirm={deleteTemplate}
  //   />

  //   {publishedTemplates && publishedTemplates.length === 0 && (
  //     <div
  //       style={{
  //         display: "flex",
  //         width: "100%",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "20vh",
  //         fontSize: "20px",
  //         fontWeight: "lighter",
  //       }}
  //     >
  //       Your Websites Will appear here
  //     </div>
  //   )}
  //   <div style={{ display: "flex", width: "70vw", flexWrap: "wrap" }}>
  //     {publishedTemplates &&
  //       publishedTemplates.map((template) => {
  //         const randomImageIndex = Math.floor(Math.random() * images.length);

  //         const randomImage = images[randomImageIndex];

  //         return (
  //           <Card
  //             key={template._id}
  //             sx={{
  //               maxWidth: 300,
  //               minWidth: 300,
  //               marginRight: "20px",
  //               marginBottom: "20px",
  //             }}
  //           >
  //             <CardActionArea>
  //               <CardMedia
  //                 onClick={() =>
  //                   openAsPublished(
  //                     template.subdomain,
  //                     template.templateid,
  //                     template.type
  //                   )
  //                 }
  //                 component="img"
  //                 height="150"
  //                 image={images[publishedTemplates.indexOf(template)]}
  //                 alt="Your Template"
  //               />

  //               <CardContent>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     width: "100%",
  //                     justifyContent: "space-between",
  //                     marginBottom: "10px",
  //                   }}
  //                 >
  //                   <Typography gutterBottom variant="h6" component="div">
  //                     {template.name}
  //                   </Typography>
  //                   <DeleteOutlineIcon
  //                     onClick={() => openDeletion(template._id)}
  //                     color="error"
  //                   />
  //                 </div>

  //                 <Group position="apart">
  //                   <Text color="dimmed" fz="sm" weight={300}>
  //                     Type
  //                   </Text>
  //                   <Text color="dimmed" fz="sm" weight={300}>
  //                     Created On
  //                   </Text>
  //                 </Group>
  //                 <Group position="apart">
  //                   <Text fz="md" weight={400}>
  //                     {template.type}
  //                   </Text>
  //                   <Text fz="md" weight={400}>
  //                     {template.Date}
  //                   </Text>
  //                 </Group>
  //               </CardContent>
  //             </CardActionArea>
  //             <CardActions>
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   width: "100%",
  //                   justifyContent: "space-between",
  //                   marginBottom: "10px",
  //                 }}
  //               ></div>
  //             </CardActions>
  //             {/* <Button variant="light" onClick={subdomainFormOpen}  style={{color:'#008B8B'}}>
  //       Publish
  //     </Button> */}
  //           </Card>
  //         );
  //       })}
  //   </div>
  // </>
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
            Published Websites
          </Text>
        </Title>
        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            These Websites Can be seen by the world
          </Text>
        </Container>
      </div>
      <Flex wrap="wrap" style={{ marginTop: "50px" }} gap="lg">
        {publishedTemplates &&
          publishedTemplates.map((template) => {
            const randomImageIndex = Math.floor(Math.random() * images.length);

            const randomImage = images[randomImageIndex];

            return (
              <Card
                key={template._id}
                sx={{
                  maxWidth: 300,
                  minWidth: 300,
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    onClick={() =>
                      openAsPublished(
                        template.subdomain,
                        template.templateid,
                        template.type
                      )
                    }
                    component="img"
                    height="150"
                    image={images[publishedTemplates.indexOf(template)]}
                    alt="Your Template"
                  />

                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography gutterBottom variant="h6" component="div">
                        {template.name}
                      </Typography>
                     
                    </div>

                    <Group position="apart">
                      <Text color="dimmed" fz="sm" weight={300}>
                        Type
                      </Text>
                      <Text color="dimmed" fz="sm" weight={300}>
                        Created On
                      </Text>
                    </Group>
                    <Group position="apart">
                      <Text fz="md" weight={400}>
                        {template.type}
                      </Text>
                      <Text fz="md" weight={400}>
                        {template.Date}
                      </Text>
                    </Group>
                  </CardContent>
                </CardActionArea>
              
                {/* <Button variant="light" onClick={subdomainFormOpen}  style={{color:'#008B8B'}}>
          Publish
        </Button> */}
              </Card>
            );
          })}
      </Flex>
    </Container>
  );
}

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this saved website? Your changes will be
        lost.
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleConfirm} color="error">
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
