const inputStyles = createStyles((theme) => ({
  innerContainer: {
    paddingTop: "2rem",
    marginBottom: "2rem",
    width: "100%",
    borderRadius: "20px",
    minHeight: "90vh",
    border: "1px solid #E5E5E5",
  },
  Container: {
    padding: "2rem 3rem 2rem 3rem",

    maxWidth: "100rem",
  },
  mainContainer: {
    padding: 0,
    overflowX: "hidden",
  },
  noPadding: {
    padding: 0,
  },
  applicationContainer: {
    padding: "15px",
    paddingRight: "30px",

    borderRight: "1px solid #E5E5E5",
  },
  Item: {
    padding: 0,
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const ApplicationDetail = () => {
  const { classes } = inputStyles();
  return (
    <Container
      style={{ overflow: "hidden" }}
      className={classes.mainContainer}
      size="100vw"
      bg="#E7E9EB"
    >
      <Grid columns={16}>
        <Grid.Col sm={4} className={classes.noPadding}>
          <ScrollArea h={670}>
            <Container
              style={{ position: "fixed", left: 10, bottom: 0 ,top:0}}
              bg="#fff"
            >
              <Container className={classes.applicationContainer}>
                <ContactDetails
                  title="Email"
                  desc="manalkiyani687@gmail"
                  Icon={EmailIcon}
                />
              </Container>
            </Container>
          </ScrollArea>
        </Grid.Col>

        <Grid.Col className={classes.noPadding} sm={12}>
          <Container className={classes.Container}></Container>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ApplicationDetail;

function ContactDetails({ title, desc, Icon }) {
  const { classes } = inputStyles();
  return (
    <Card mb="md" shadow="xs">
      <Flex align="center" justify="flex-start">
        <Avatar radius="md">
          <Icon size="1.5rem" />
        </Avatar>
        <Space w="xl" />
        <Card.Section>
          <Text fz="sm" fw={700} className={classes.title}>
            {title}
          </Text>

          <Text color="dimmed" size="sm">
            {desc}
          </Text>
        </Card.Section>
      </Flex>
    </Card>
  );
}
//upload on server and give link
function ResumeViewer({ resumeUrl }) {
  const docs = [
    { uri: require("../../../resumes/myCV.pdf") }, // Local File
  ];

  return (
    <DocViewer
      style={{ width: 600, height: 670 }}
      pluginRenderers={DocViewerRenderers}
      documents={docs}
    />
  );
}

//Institute = 'Leopard Camphill'
//Major = 'Computer Science'
//description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//location = 'Islamabad I-8/4'
//dates = [{title: 'Start Date', value: '2019-01-01'}, {title: 'End Date', value: '2019-01-01'}}]

function Education({
  Institute,
  Major,
  description,
  location = "Not available",
  dates = [],
}) {
  const { classes } = inputStyles();

  const items = dates.map((date) => (
    <div key={date.title}>
      <Text size="xs" color="dimmed">
        {date.title}
      </Text>
      <Text weight={500} size="sm">
        {date.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Group position="apart" mt="md">
        <Text fz="sm" fw={700} className={classes.title}>
          {Institute}
        </Text>
        <Group spacing={5}>
          <Text fz="md">{Major}</Text>
          <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
        </Group>
      </Group>
      <Flex align="center">
        <PinIcon size="1rem" />
        <Space w="xs" />
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          {location}
        </Text>
      </Flex>

      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {description}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}

//dates = [{title: 'Start Date', value: '2019-01-01'}, {title: 'End Date', value: '2019-01-01'}}]
