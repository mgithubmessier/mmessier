'use client';

import { Typography } from '@mui/material';

import { basicStyles } from './styles';
import Link from 'next/link';
import { DEMO_FORMS } from './use-query-parameters-demo/[routeName]/constants';

export const ProjectsClient = () => {
  return (
    <div>
      <Typography variant="h2">Use Query Parameters</Typography>
      <Typography variant="h3">
        <Link
          href={`/projects/use-query-parameters-demo/${DEMO_FORMS[0]}`}
          style={basicStyles.static?.link}
        >
          Demo
        </Link>
      </Typography>
      <Typography style={basicStyles.static?.text}>
        A react hook that is meant to make query parameter management an
        extremely simple endeavor. You supply a &quot;subscription&quot; key and
        then are able to set that key to any JSON serializable value and get
        updates on changes to it across your entire application from any
        component at any time
      </Typography>
      <Typography variant="h2">D3 - Force Graph</Typography>
      <Link
        href={`/projects/d3-visualizations/force-graph`}
        style={basicStyles.static?.link}
      >
        Demo
      </Link>
      <Typography variant="h2">Abstract Server</Typography>
      <Typography variant="h3">Demo - Coming Soon</Typography>
      <div>
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
        </Typography>
        <ul style={basicStyles.static?.ul}>
          <li>
            <Typography style={basicStyles.static?.text}>
              Authentication
            </Typography>
          </li>
          <ul>
            <li>
              <Typography style={basicStyles.static?.text}>
                JWT Tokens to cache Authorization and reduce database load
              </Typography>
            </li>
            <li>
              <Typography style={basicStyles.static?.text}>
                MFA for secure login
              </Typography>
            </li>
          </ul>
          <li>
            <Typography style={basicStyles.static?.text}>Geocoding</Typography>
          </li>
          <li>
            <Typography style={basicStyles.static?.text}>
              Entity Creation
            </Typography>
          </li>
          <li>
            <Typography style={basicStyles.static?.text}>
              Realtime Entity Updates
            </Typography>
          </li>
          <ul>
            <li>
              <Typography style={basicStyles.static?.text}>
                Websocket
              </Typography>
            </li>
            <li>
              <Typography style={basicStyles.static?.text}>
                Server-Side Events
              </Typography>
            </li>
          </ul>
        </ul>
      </div>
      <Typography variant="h2">Musiq.page</Typography>
      <Typography variant="h3">
        <a
          target="_blank"
          href="https://musiq.page"
          style={basicStyles.static?.link}
        >
          Demo
        </a>
      </Typography>
      <Typography style={basicStyles.static?.text}>
        Write lyric and chord combinations in a user-friendly interface. You can
        save and load a .json file of your work on your computer. And you can
        print it out afterward!
      </Typography>
    </div>
  );
};
