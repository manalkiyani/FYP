import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
  rem,
  Space,
} from "@mantine/core";

import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import IconDots from "@mui/icons-material/MoreHorizOutlined";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export function Product({
  id,
  name,
  images,
  view,
  price,
  setDeleteId,
  handleOpenDialogue,
  handleEditProduct,
}) {
  const handleDialogue = () => {
    setDeleteId(id);
    handleOpenDialogue();
  };

  return (
    <>
      <Card
        mb="lg"
        style={{ marginRight: "30px", width: "370px" }}
        withBorder
        shadow="sm"
        radius="md"
      >
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>
              {name} <Text weight={400}>{price}$</Text>
            </Text>

            <Menu withinPortal position="bottom-end" shadow="sm">
              {view === "none" ? null : (
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size="1rem" />
                  </ActionIcon>
                </Menu.Target>
              )}

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => handleEditProduct(id)}
                  icon={<EditIcon size={rem(14)} />}
                >
                  Edit
                </Menu.Item>
                <Menu.Item icon={<EyeIcon size={rem(14)} />}>
                  Preview{" "}
                </Menu.Item>
                <Menu.Item
                  onClick={handleDialogue}
                  icon={<DeleteIcon size={rem(14)} />}
                  color="red"
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Card.Section>
        <Space h="md" />

        {/* <div
          style={{ color: "#808080", fontSize: "14px", fontWeight: "300" }}
          dangerouslySetInnerHTML={{ __html: description }}
        /> */}

        <Card.Section px="md" mt="sm">
          <Image width={338} height={200} src={images[0]} />
        </Card.Section>

        <Card.Section inheritPadding mt="sm" pb="md">
          <SimpleGrid cols={3}>
            {images.slice(1, 4).map((image) => (
              <Image src={image} key={image} radius="sm" />
            ))}
          </SimpleGrid>
        </Card.Section>
      </Card>
    </>
  );
}
