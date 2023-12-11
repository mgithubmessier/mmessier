'use client';

import { Typography } from '@mui/material';

import { basicStyles } from './styles';

export const ProjectsClient = () => {
  return (
    <div>
      <Typography variant="h2">Use Query Parameters</Typography>
      <Typography style={basicStyles.static?.text}>
        A react hook that is meant to make query parameter management an
        extremely simple endeavor. You supply a &quot;subscription&quot; key and
        then are able to set that key to any JSON serializable value and get
        updates on changes to it across your entire applicaation from any
        component at any time
      </Typography>
      <Typography variant="h2">Abstract Server</Typography>
      <Typography style={basicStyles.static?.text}>
        A work-in-progress private repository I built out to quickly support
        secure{' '}
        <a
          target="_blank"
          style={basicStyles.static?.link}
          href="https://go.dev/"
        >
          golang
        </a>{' '}
        microservices with common endpoints for any project I support. It
        includes endpoints that perform the following:
        <ul style={basicStyles.static?.ul}>
          <li>Authentication</li>
          <ul>
            <li>JWT Tokens to cache Authorization and reduce database load</li>
            <li>MFA for secure login</li>
          </ul>
          <li>Geocoding</li>
          <li>Entity Creation</li>
          <li>Realtime Entity Updates</li>
          <ul>
            <li>Websocket</li>
            <li>Server-Side Events</li>
          </ul>
        </ul>
      </Typography>
      <Typography variant="h2">Musiq.page</Typography>
      <Typography style={basicStyles.static?.text}>
        Write lyric and chord combinations in a user-friendly interface. You can
        save and load a .json file of your work on your computer. And you can
        print it out afterward!
      </Typography>
      <Typography style={basicStyles.static?.text}>
        You can check all of this out at{' '}
        <a
          target="_blank"
          href="https://musiq.page"
          style={basicStyles.static?.link}
        >
          musiq.page
        </a>
      </Typography>
    </div>
  );
};
