import { Group, Paper } from "@mantine/core";
import React from "react";

const Video = () => {
  return (
    <Group position="center">
      <Paper p="md" shadow="md">
        <video loop style={{ height: "80vh" }} controls autoPlay>
          <source
            src="https://res.cloudinary.com/djlewzcd5/video/upload/v1684930037/bandicam_2023-05-24_16-56-44-211_m3uqky.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Paper>
    </Group>
  );
};

export default Video;
