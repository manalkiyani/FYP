import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  rem,
  Image,
} from "@mantine/core";

const mockdata = [
  {
    title: "Image sliders",
    Image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684931019/Screenshot_2023-05-24_172321_joijz6.png",
    color: "violet",
  },
  {
    title: "Application cards",
    Image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684929635/features4_cjoxqt.png",
    color: "indigo",
  },
  {
    title: "Team",
    Image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684930934/Screenshot_2023-05-24_172158_gfjxdk.png",
    color: "blue",
  },
  {
    title: "Hero Headers",
    Image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684929641/header2_h0uhjj.png",
    color: "green",
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    width: rem(1200),
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

export function MainServices() {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <Image
        maw={240}
        mx="auto"
        radius="md"
        src={item.Image}
        alt="Random image"
      />
      {/* <item.icon color={theme.colors[item.color][6]} size="2rem" /> */}
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Group position="center">
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
          <Text className={classes.title}>Services</Text>
          <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            + many other blocks
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </Group>
  );
}
