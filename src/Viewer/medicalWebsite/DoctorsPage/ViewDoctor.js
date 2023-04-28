import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import PersonPinIcon from "@mui/icons-material/PersonPinCircleOutlined";
import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const ViewDoctor = ({ doctor, patient }) => {
  const { classes } = useStyles();
  const [expanded, setExpanded] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const handleAvailabilityClick = (doctorId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [doctorId]: !prevExpanded[doctorId],
    }));
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    console.log(patient.email);
  };

  return (
    <>
      <div>
        <Card withBorder radius="md" className={classes.card}>
          <Group position="apart" mt="md">
            <div>
              <Text fw={500}>{doctor.name}</Text>

              <Text fz="xs" c="dimmed">
                {doctor.description}
              </Text>
            </div>
            <Badge color="red" size="lg">
              {doctor.gender}
            </Badge>
          </Group>

          <Accordion
            expanded={expanded[doctor._id]}
            onChange={() => handleAvailabilityClick(doctor._id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="availability-content"
              id="availability-header"
            >
              <Typography>Availability</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <Select
                  labelId="day-select-label"
                  id="day-select"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <MenuItem value="monday">Monday</MenuItem>
                  <MenuItem value="tuesday">Tuesday</MenuItem>
                  <MenuItem value="wednesday">Wednesday</MenuItem>
                  <MenuItem value="thursday">Thursday</MenuItem>
                  <MenuItem value="friday">Friday</MenuItem>
                </Select>
              </FormControl>
              {selectedDay && (
                <ul>
                  <li>
                    {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                    : {doctor.availability[selectedDay].start} -{" "}
                    {doctor.availability[selectedDay].end}
                  </li>
                </ul>
              )}
            </AccordionDetails>
          </Accordion>

          <Card.Section className={classes.section} mt="md">
            <Text fz="sm" c="dimmed" className={classes.label}>
              Latest Quanlification
            </Text>

            <Group spacing={8} mb={-8}>
              <Center>
                <Text size="xs">{doctor.latestQualification}</Text>
              </Center>
            </Group>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Flex justify="space-between">
              <div>
                <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                  $168.00
                </Text>
                <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                  per appointment
                </Text>
              </div>

              <Link
                to={`/viewerdocprofile?doctor=${encodeURIComponent(
                  JSON.stringify(doctor)
                )}&patient=${encodeURIComponent(JSON.stringify(patient))}`}
              >
                <Button color="cyan" size="sm" radius="xl">
                  View Profile
                </Button>
              </Link>
            </Flex>
          </Card.Section>
        </Card>
      </div>
    </>
  );
};
export default ViewDoctor;
