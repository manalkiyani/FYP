import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  rem,
  Menu,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import IconDots from "@mui/icons-material/MoreHorizOutlined";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import EditDoctorForm from "../EditDoctorForm/EditDoctorForm";

import { getTemplateId } from "../././../../../src/utilityFunctions/TemplateIdController";
import { getWebsiteData } from "../././../../../src/utilityFunctions/websiteDataController";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 630,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function DoctorCard({
  image,
  title,
  id,
  view,
  qualification,
  experience,
  department,
  address,
  availability,
  description,
  gender
}) {
  const { classes } = useStyles();
  const navigate = useNavigate()
  
  
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState(null);




  useEffect(() => {
    async function fetchData() {
      const Template = await getTemplateId();
      console.log(Template);
      const response = await getWebsiteData(Template.templateId);
      // Do something with the response
      setTemplate(response);
    }
    fetchData();
  }, []);

  const handleDelete = (docID) => {
    console.log("This is doctor id in handleDelete " + docID);
    axios
      .delete(`http://localhost:8800/api/doctor/deldoctor/${docID}`)
      .then((res) => {
        console.log(res.data + "This is doctors data");


        axios.put("http://localhost:8800/api/doctor/deldoctoridfromtemplate",{TEMPLATEID:template, doctorid: docID})
        .then((res) => {
          console.log(res.data + "This is doctors data");

        })


      })
      .then(function (response) {
        toast.success("Doctor Deleted Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const handleEdit = ()=>{
    setOpen(true)
    console.log("abc")
  }
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
    <Card
      style={{ width: "680px", height: "190px" }}
      withBorder
      radius="md"
      p={0}
      className={classes.card}
    
    >
      <Group noWrap spacing={0}>
        <Image  onClick={()=> navigate(`${id}`)} src={image} height={190} width={160} />
        <div className={classes.body}>
          <Flex justify="flex-end">
            <Menu withinPortal position="bottom-end" shadow="sm">
              {view === "none" ? null : (
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size="1rem" />
                  </ActionIcon>
                </Menu.Target>
              )}

              <Menu.Dropdown>
                <Menu.Item onClick={handleEdit} icon={<EditIcon  size={rem(14)} />}>Edit</Menu.Item>
                <Menu.Item icon={<EyeIcon size={rem(14)} />}>
                  Preview{" "}
                </Menu.Item>
                <Menu.Item onClick={()=>handleDelete(id)} icon={<DeleteIcon size={rem(14)} />} color="red">
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>

          <Text  onClick={()=> navigate(`${id}`)} fz={26} className={classes.title} mt="xs" mb="md">
           {title}
          </Text>

          <Card.Section style={{ width: "500px",backgroundColor:"#EDFAF8", padding:'20px', marginLeft:'1px' }} className={classes.footer}>
            <div>
              <Text size="xs" color="dimmed">
                Qualification
              </Text>
              <Text weight={500} size="sm">
                {qualification}
              </Text>
            </div>
            <div>
              <Text size="xs" color="dimmed">
                Experience
              </Text>
              <Text weight={500} size="sm">
                {experience} years
              </Text>
            </div>
             <div>
              <Text size="xs" color="dimmed">
                Department
              </Text>
              <Text weight={500} size="sm">
                {department} 
              </Text>
            </div>


          </Card.Section>
        </div>
      </Group>
    </Card>

    {open && 

    
    <EditDoctorForm setOpen={setOpen} id1={id} title1 = {title} department1={department}
    address1={address}
    availability1 = {availability}
    description1 = {description}
    experience1 = {experience}
    gender1 = {gender}
    qualification1 = {qualification}
  
    ></EditDoctorForm>}

    {open}
    </div>
    
    
  );
  
}

