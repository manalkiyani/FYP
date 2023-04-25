import React from "react";
import {
  Container,
  Title,
  Accordion,
  createStyles,
  rem,
  Flex,
  TextInput,
  Checkbox,
  Grid,
  Text,
  Divider,
} from "@mantine/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ViewJob from "./ViewJob";
import axios from "axios";
import { useEffect } from "react";

const ViewJobs = ({ jobIds }) => {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 600,
      padding: 0,
    },
    mainContainer: {
      padding: `calc(${theme.spacing.xl} * 2)`,
    },
    container: {
      paddingTop: `calc(${theme.spacing.xl} * 2)`,
      paddingBottom: `calc(${theme.spacing.xl} * 2)`,
      width: "100%",
    },

    item: {
      borderRadius: theme.radius.md,
    },
    gridItem: {
      position: "static",
    },
  }));

  const [jobs, setJobs] = React.useState([]);
  const [jobsCopy, setJobsCopy] = React.useState([]);

  const [degreeList, setDegreeList] = React.useState("");
  const [jobTypeList, setJobTypeList] = React.useState("");

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const res = await axios.post("http://localhost:8800/api/jobs/get", {
      jobIds,
    });
    setJobs(res.data.jobs);
    setJobsCopy(res.data.jobs);
    console.log(res.data);
  };

  const filterJobTitle = (value) => {
    // const value = e.target.value;
    const filteredJobs = jobsCopy.filter((job) => {
      console.log(job);
      return (
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.description.toLowerCase().includes(value.toLowerCase())
      );
    });
    setJobs(filteredJobs);
  };
  const filterJobDescription = (value) => {
    // const value = e.target.value;
    const filteredJobs = jobsCopy.filter((job) => {
      console.log(job);
      return (
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.description.toLowerCase().includes(value.toLowerCase())
      );
    });
    setJobs(filteredJobs);
  };

  // "Full-time",
  //               "Part-time",
  //               "Temporary",
  //               "Intern",
  //               "Contract",
  //               "InOffice", "Remote"

  //                 "Associate",
  //               "Masters",
  //               "Bachelors",
  //               "Ph.D",
  //               "Pursuing Degree"

  // const handleDegreeSearch = (value) => {
  //   console.log(value);
  // };

  const filterDegree = () => {
    if (degreeList.length !== 0) {
      const filteredJobs = jobsCopy.filter((job) => {
        // Check if the degree required for the job is in the degree list
        return degreeList.includes(job.minimumQualification);
      });

      setJobs(filteredJobs);
    } else {
      setJobs(jobsCopy);
    }
  };

  const filterJobType = () => {
    if (jobTypeList.length !== 0) {
      const filteredJobs = jobsCopy.filter((job) => {
        // Check if the degree required for the job is in the degree list
        return jobTypeList.includes(job.employeeType || job.location);
      });
      setJobs(filteredJobs);
    } else {
      setJobs(jobsCopy);
    }
  };

  useEffect(() => {
    console.log(degreeList);
    filterDegree();
  }, [degreeList]);

  useEffect(() => {
    console.log(jobTypeList);
    filterJobType();
  }, [jobTypeList]);

  const { classes } = useStyles();
  return (
    <Grid className={classes.container} justify="space-around">
      <Grid.Col
        className={classes.gridItem}
        position="static"
        padding={0}
        span={3}
      >
        <Container size="sm" className={classes.wrapper}>
          <Accordion variant="separated">
            <Accordion.Item className={classes.item} value="credit-card">
              <Accordion.Control>What do you want to do?</Accordion.Control>
              <Accordion.Panel>
                <TextInput
                  placeholder="Software Engineer, Web Developer"
                  required
                  onChange={(e) => filterJobTitle(e.target.value)}
                />
                <SearchOutlinedIcon onClick={filterJobTitle} />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className={classes.item} value="skills">
              <Accordion.Control>Skills & Qualifications</Accordion.Control>
              <Accordion.Panel>
                <TextInput
                  placeholder="Computer Programming, Web Development"
                  required
                  onChange={(e) => filterJobDescription(e.target.value)}
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="another-account">
              <Accordion.Control>Degree</Accordion.Control>
              <Accordion.Panel>
                <Flex wrap="wrap">
                  <Checkbox.Group value={degreeList} onChange={setDegreeList}>
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Associate"
                      value="Associate"
                    />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Bachelors"
                      value="Bachelors"
                    />
                    <Checkbox mr={20} mt={20} label="Masters" value="Masters" />
                    <Checkbox mr={20} mt={20} label="Ph.D" value="Ph.D" />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Pursuing Degree"
                      value="Pursuing Degree"
                    />
                  </Checkbox.Group>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="newsletter">
              <Accordion.Control>Employment types</Accordion.Control>
              <Accordion.Panel>
                <Flex wrap="wrap">
                  <Checkbox.Group value={jobTypeList} onChange={setJobTypeList}>
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Full Time"
                      value="Full-time"
                    />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Part Time"
                      value="Part-time"
                    />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Contract"
                      value="Contract"
                    />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Internship"
                      value="Internship"
                    />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="Temporary"
                      value="Temporary"
                    />
                    <Checkbox
                      mr={20}
                      mt={20}
                      label="In Office"
                      value="InOffice"
                    />
                    <Checkbox mr={20} mt={20} label="Remote" value="Remote" />
                  </Checkbox.Group>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Grid.Col>
      <Grid.Col span={7}>
        <Flex direction="column">
          {jobs.map((job) => (
            <ViewJob key={job._id} job={job} />
          ))}
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default ViewJobs;
