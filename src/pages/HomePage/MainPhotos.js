import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Title,
  rem,
} from "@mantine/core";

const mockdata = [
  {
    title: "Carousels and Scrolling",
    image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684931019/Screenshot_2023-05-24_172321_joijz6.png",
    date: "August 18, 2022",
  },
  {
    title: "Application Cards",
    image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684929635/features4_cjoxqt.png",
    date: "August 27, 2022",
  },
  {
    title: "People and Team",
    image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684930934/Screenshot_2023-05-24_172158_gfjxdk.png",
    date: "September 9, 2022",
  },
  {
    title: "Hero Headers",
    image:
      "https://res.cloudinary.com/djlewzcd5/image/upload/v1684929641/header2_h0uhjj.png",
    date: "September 12, 2022",
  },
];

const useStyles = createStyles((theme) => ({
  maintitle: {
    fontSize: rem(50),
    fontWeight: 700,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function MainPhotos() {
  const { classes } = useStyles();

  const cards = mockdata.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1720 / 880}>
        <Image src={article.image} />
      </AspectRatio>

      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <div style={{ marginTop: "100px" }}>
      <Title
        mt="xl"
        mb="lg"
        order={1}
        className={classes.maintitle}
        ta="center"
      >
        Drag n Drop Blocks
      </Title>
      <Container size="80rem" style={{ backgroundColor: "#7B64FF" }} py="md">
        <SimpleGrid cols={2}>{cards}</SimpleGrid>
      </Container>
    </div>
  );
}
