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
const ViewJobs = () => {
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
              <Accordion.Control>
                <SearchOutlinedIcon />
                What do you want to do?
              </Accordion.Control>
              <Accordion.Panel>
                <TextInput
                  placeholder="Software Engineer, Web Developer"
                  required
                />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className={classes.item} value="skills">
              <Accordion.Control>Skills & Qualifications</Accordion.Control>
              <Accordion.Panel>
                <TextInput
                  placeholder="Computer Programming, Web Development"
                  required
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="another-account">
              <Accordion.Control>Degree</Accordion.Control>
              <Accordion.Panel>
                <Flex wrap="wrap">
                  <Checkbox mr={20} mt={20} label="Associate" />
                  <Checkbox mr={20} mt={20} label="Bachelors" />
                  <Checkbox mr={20} mt={20} label="Masters" />
                  <Checkbox mr={20} mt={20} label="Ph.D" />
                  <Checkbox mr={20} mt={20} label="Pursuing Degree" />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="newsletter">
              <Accordion.Control>Employment types</Accordion.Control>
              <Accordion.Panel>
                <Flex wrap="wrap">
                  <Checkbox mr={20} mt={20} label="Full Time" />
                  <Checkbox mr={20} mt={20} label="Part Time" />
                  <Checkbox mr={20} mt={20} label="Contract" />
                  <Checkbox mr={20} mt={20} label="Internship" />
                  <Checkbox mr={20} mt={20} label="Temporary" />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Grid.Col>
      <Grid.Col span={8}>
        <Flex direction="column">
          <ViewJob />
          <ViewJob />
          <ViewJob />
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default ViewJobs;
