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
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import IconDots from "@mui/icons-material/MoreHorizOutlined";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";

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
}) {
  const { classes } = useStyles();
  const navigate = useNavigate()
  
  return (
    <Card
      style={{ width: "700px", height: "190px" }}
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
                <Menu.Item icon={<EditIcon size={rem(14)} />}>Edit</Menu.Item>
                <Menu.Item icon={<EyeIcon size={rem(14)} />}>
                  Preview{" "}
                </Menu.Item>
                <Menu.Item icon={<DeleteIcon size={rem(14)} />} color="red">
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>

          <Text  onClick={()=> navigate(`${id}`)} fz={26} className={classes.title} mt="xs" mb="md">
            {/* {title} */} DR. Richard Steward
          </Text>

          <Card.Section style={{ width: "500px" }} className={classes.footer}>
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
  );
}