import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocalStorageState } from 'ahooks';
import { Button, Space } from '@mantine/core';

import { Card, Text, Group, Center, createStyles, getStylesRef, rem } from '@mantine/core';
export default function AvailableTemplate({id,type,img,title,description}) {
   const [templateId, setTemplateId] = useLocalStorageState("templateId", "0");
  const [template, setTemplate] = useLocalStorageState("template", "")
const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const openTemplate = (id) => {
  
    setTemplateId(id);
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });

    navigate(`/${type}/template/${id}`);
  };
  return (
   
   
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      onClick={() => openTemplate(id)}
     
    >
      <div className={classes.image} style={{ backgroundImage: `url(${img})` }} />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="xl" className={classes.title} weight={500}>
             {title}
          </Text>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author}>
            TYPE {type}
            </Text>

            
          </Group>
        </div>
      </div>
    </Card>
  
  );
}


const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    height: rem(300),
    width:rem(350),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    [`&:hover .${getStylesRef('image')}`]: {
      transform: 'scale(1.03)',
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
  },

  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

