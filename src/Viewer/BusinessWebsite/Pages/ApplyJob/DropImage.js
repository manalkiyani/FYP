import { Group, Text, useMantineTheme, rem } from "@mantine/core";

import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import IconPhoto from "@mui/icons-material/CollectionsOutlined";
import IconUpload from "@mui/icons-material/FileUploadOutlined";
import IconX from "@mui/icons-material/CloseOutlined";

export default function DropImage(props) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted files", files)}
      onReject={(files) => console.log("rejected files", files)}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: rem(220), pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag resume here or click to browse files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach your pdf or docx resume here.Each file should not exceed 10mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
