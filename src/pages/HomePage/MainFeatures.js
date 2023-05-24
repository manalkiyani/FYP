import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";

import IconUser from "@mui/icons-material/AutoFixHigh";
import IconGauge from "@mui/icons-material/PanTool";
import IconCookie from "@mui/icons-material/PublishedWithChanges";

const mockdata = [
  {
    title: "Drag n drop blocks",
    description:
      'Start with creating a new website and picking up the template. Then expand the blocks panel with the big red "plus" button in the lower right corner and start dragging the blocks you like.',

    icon: IconGauge,
  },
  {
    title: "Edit and style inline",
    description:
      "Edit the content of each block just like you would in a regular text editor, click on media elements to replace it by your own image, video or icon",
    icon: IconUser,
  },
  {
    title: "Preview and publish",
    description:
      'Click on "Preview" in the website maker to check how your site looks and publish to uCarft subdomain.',
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    color: "#7B64FF",
    fontSize: rem(50),
    fontWeight: 700,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(50),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function MainFeatures() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(65)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container
      style={{ marginTop: "100px", marginBottom: "100px" }}
      mb="xl"
      mt="xl"
      size="lg"
      py="xl"
    >
      <Title order={1} className={classes.title} ta="center" mt="sm">
        Create awesome No code websites!
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Mobirise is perfect for non-techies who are not familiar with the
        intricacies of web design and prefer to be a part of no-code revolution
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
