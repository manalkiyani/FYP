import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Space,
} from "@mantine/core";

import IconCheck from "@mui/icons-material/CheckCircleOutlined";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(700),
    marginRight: `calc(${theme.spacing.lg} * 2)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function DoctorDetail({ view }) {
  const { classes } = useStyles();
  const { doctorId } = useParams();

  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const getDoctor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/doctor/getOne/${doctorId}`
      );
      const doctor = response.data.doctor[0];
      console.log(doctor);
      setName(doctor.name);
      setDescription(doctor.description);
      setExperience(doctor.experience);
      setQualification(doctor.latestQualification);
      setDepartment(doctor.department);
      setImage(doctor.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Dr.
              <br />
              <span className={classes.highlight}> {name}</span>
            </Title>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Experience</b> – {experience} years
              </List.Item>
              <List.Item>
                <b>Qualification</b> – {qualification}
              </List.Item>
              <List.Item>
                <b>Department</b> – {department}
              </List.Item>
            </List>
            <Group mt={30}>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Book an Appointment
              </Button>
            </Group>

            <Space h="xl" />
            {/* <Text color="dimmed" mt="md">
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text> */}

            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <Image
            height={190}
            width={190}
            src={image}
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  );
}
