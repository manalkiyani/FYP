import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Anchor,
  Group,
  Image,
  rem,
} from "@mantine/core";

const HEADER_HEIGHT = rem(84);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  mainLinks: {
    marginRight: `calc(${theme.spacing.sm} * -1)`,
  },

  mainLink: {
    textTransform: "uppercase",
    fontSize: rem(13),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    padding: `${rem(7)} ${theme.spacing.sm}`,
    fontWeight: 700,
    borderBottom: `${rem(2)} solid transparent`,
    transition: "border-color 100ms ease, color 100ms ease",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      textDecoration: "none",
    },
  },

  mainLinkActive: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottomColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6],
  },
}));
// export function ViewerNavbar3({ mainLinks })
export function ViewerNavbar3() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);
  const mainLinks = [
    { link: "", label: "Home" },
    { link: "", label: "Features" },
    { link: "", label: "Services" },
    { link: "", label: "Contact Us" },
  ];
  const mainItems = mainLinks.map((item, index) => (
    <Anchor
      href={item.link}
      key={item.label}
      className={cx(classes.mainLink, {
        [classes.mainLinkActive]: index === active,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={120}>
      <Container className={classes.inner}>
        <Image
          style={{ objectFit: "contain" }}
          height={60}
          width={150}
          src="https://res.cloudinary.com/djlewzcd5/image/upload/v1684336933/image-removebg-preview_fxwndz.png"
        />
        <div className={classes.links}>
          <Group spacing={0} position="right" className={classes.mainLinks}>
            {mainItems}
          </Group>
        </div>
      </Container>
    </Header>
  );
}
