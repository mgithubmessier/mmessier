'use client';

// import { Typography } from '@mui/material';

// import { basicStyles } from './styles';
// import Link from 'next/link';
import { DEMO_FORMS } from './use-query-parameters-demo/[routeName]/constants';
import { TriangleNavigation } from './components/TriangleNavigation.client';

export const ProjectsClient = () => {
  return (
    <TriangleNavigation
      items={[
        {
          title: 'Use Query Parameters',
          link: `/projects/use-query-parameters-demo/${DEMO_FORMS[0]}`,
        },
        {
          title: 'Force Graph',
          link: `/projects/d3-visualizations/force-graph`,
        },
        {
          title: 'Musiq.page',
          link: 'https://musiq.page',
        },
      ]}
    />
  );
};

// export const ProjectsClient = () => {
//   return (
//     <div>
//       <Typography variant="h2">D3 - Force Graph</Typography>
//       <Typography variant="h3">
//         <Link
//           href={`/projects/d3-visualizations/force-graph`}
//           style={basicStyles.static?.link}
//         >
//           Demo
//         </Link>
//       </Typography>
//       <Typography variant="h2">Abstract Server</Typography>
//       <Typography variant="h3">Demo - Coming Soon</Typography>
//       <div>
//         <Typography style={basicStyles.static?.text}>
//           A work-in-progress private repository I built out to quickly support
//           secure{' '}
//           <a
//             target="_blank"
//             style={basicStyles.static?.link}
//             href="https://go.dev/"
//           >
//             golang
//           </a>{' '}
//           microservices with common endpoints for any project I support. It
//           includes endpoints that perform the following:
//         </Typography>
//         <ul style={basicStyles.static?.ul}>
//           <li>
//             <Typography style={basicStyles.static?.text}>
//               Authentication
//             </Typography>
//           </li>
//           <ul>
//             <li>
//               <Typography style={basicStyles.static?.text}>
//                 JWT Tokens to cache Authorization and reduce database load
//               </Typography>
//             </li>
//             <li>
//               <Typography style={basicStyles.static?.text}>
//                 MFA for secure login
//               </Typography>
//             </li>
//           </ul>
//           <li>
//             <Typography style={basicStyles.static?.text}>Geocoding</Typography>
//           </li>
//           <li>
//             <Typography style={basicStyles.static?.text}>
//               Entity Creation
//             </Typography>
//           </li>
//           <li>
//             <Typography style={basicStyles.static?.text}>
//               Realtime Entity Updates
//             </Typography>
//           </li>
//           <ul>
//             <li>
//               <Typography style={basicStyles.static?.text}>
//                 Websocket
//               </Typography>
//             </li>
//             <li>
//               <Typography style={basicStyles.static?.text}>
//                 Server-Side Events
//               </Typography>
//             </li>
//           </ul>
//         </ul>
//       </div>
//       <Typography variant="h2">Musiq.page</Typography>
//       <Typography variant="h3">
//         <a
//           target="_blank"
//           href="https://musiq.page"
//           style={basicStyles.static?.link}
//         >
//           Demo
//         </a>
//       </Typography>
//       <Typography style={basicStyles.static?.text}>
//         Write lyric and chord combinations in a user-friendly interface. You can
//         save and load a .json file of your work on your computer. And you can
//         print it out afterward!
//       </Typography>
//     </div>
//   );
// };
