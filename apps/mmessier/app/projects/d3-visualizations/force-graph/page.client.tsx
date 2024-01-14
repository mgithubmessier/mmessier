'use client';

import * as yup from 'yup';
import { ForceGraph, LinkData, NodeData } from '@mmessier/d3-visualizations';
import { Button, Typography } from '@mui/material';
import { RHFSelectField } from '../../../components/fields/SelectField/SelectField';
import { RHFTextField } from '../../../components/fields/TextField/TextField';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useYupResolver } from '../../../hooks/useYupResolver';

import { styles as forceGraphStyles } from './styles.client';
import { useStyles } from '../../../hooks/useStyles';
import { Add, ArrowLeft } from '@mui/icons-material';
import Link from 'next/link';

type FormData = {
  nodeID: string;
  linkIDs: string[];
};

const defaultNodes: NodeData[] = [
  {
    id: 'NODE_1',
    label: 'NODE_1',
  },
  {
    id: 'NODE_2',
    label: 'NODE_2',
  },
];

const defaultLinks: LinkData[] = [
  {
    id: 'LINK_ID',
    source: defaultNodes[0].id,
    target: defaultNodes[1].id,
  },
];

const schema = yup.object({
  nodeID: yup.string().required(),
  linkIDs: yup.array().min(1).required(),
});

export const ForceGraphClient = () => {
  const styles = useStyles(forceGraphStyles);
  const resolver = useYupResolver(schema);
  const { handleSubmit, control } = useForm<FormData>({
    resolver,
    defaultValues: {
      linkIDs: [],
      nodeID: '',
    },
  });
  const [links, setLinks] = useState<LinkData[]>(defaultLinks);
  const [nodes, setNodes] = useState<NodeData[]>(defaultNodes);

  const onSubmit = (formData: FormData) => {
    const nodeID = formData.nodeID.replace(/ |!/g, '');
    setNodes((n) => [...n, { id: nodeID, label: nodeID }]);
    setLinks((l) => [
      ...l,
      ...formData.linkIDs.map((linkID) => ({
        id: uniqueId(),
        source: nodeID,
        target: linkID,
      })),
    ]);
  };
  return (
    <div>
      <Link href="/projects">
        <Button startIcon={<ArrowLeft />}>Back to Projects</Button>
      </Link>
      <Typography variant="h2">Summary</Typography>
      <Typography style={styles.static?.text}>
        Visualize data in a minimal and interactive directed graph. Perfect for
        inheritance models, relational data, and much more!
      </Typography>

      <div style={styles.static?.flexContainer}>
        <div>
          <div style={styles.static?.formContainer}>
            <Typography variant="h2">Add Node to Graph</Typography>
            <RHFTextField
              control={control}
              name="nodeID"
              label="Add a label"
              containerStyle={styles.static?.field}
            />
            <RHFSelectField
              label="Choose connections"
              control={control}
              name="linkIDs"
              multiple
              options={nodes.map((node) => ({
                label: node.id,
                value: node.id,
              }))}
              containerStyle={styles.static?.field}
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              startIcon={<Add />}
            >
              Add Node
            </Button>
          </div>
        </div>
        <div>
          <ForceGraph links={links} nodes={nodes} hiddenByDefault={false} />
        </div>
      </div>
    </div>
  );
};
