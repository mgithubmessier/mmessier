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

type FormData = {
  nodeID: string;
  linkIDs: string[];
};

const defaultNodes: NodeData[] = [
  {
    id: 'NODE_ID_1',
  },
  {
    id: 'NODE_ID_2',
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
    const nodeID = formData.nodeID.replace(/ /g, '');
    setNodes((n) => [...n, { id: nodeID }]);
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
      <Typography variant="h2">Add Node to Graph</Typography>
      <div style={styles.static?.formContainer}>
        <RHFTextField
          control={control}
          name="nodeID"
          label="Add a label"
          containerStyle={styles.static?.field}
        />
        <RHFSelectField
          label="Choose the nodes you want connected"
          control={control}
          name="linkIDs"
          multiple
          options={nodes.map((node) => ({ label: node.id, value: node.id }))}
          containerStyle={styles.static?.field}
        />
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Add Node
        </Button>
      </div>
      <Typography variant="h2">The Force Graph</Typography>
      <ForceGraph links={links} nodes={nodes} hiddenByDefault={false} />
    </div>
  );
};
