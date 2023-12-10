import { set } from 'date-fns';
import { Experience } from '../../../types';

export const experiences: Array<Experience> = [
  {
    keyTerms: [
      'React',
      'React Native',
      'Golang',
      'Cypress',
      'GeoJSON',
      'Detox',
      'Stax',
      'AWS',
      'Websocket',
      'CI/CD',
      'Manage',
      'Guild',
      'Lead',
      'Microservice',
    ],
    logo: '/dispatch.webp',
    companyURL: 'https://dispatch.me/',
    id: '0',
    company: 'Dispatch Technologies',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 0, year: 2022 }).toISOString(),
    title: 'Software Engineer, Team Lead',
    details: [
      {
        id: '0.1',
        detail: 'Oversee and Execute Software Development and Releases',
        subDetails: [
          {
            id: '0.1.1',
            detail:
              'React Native mobile application to both Android and iOS devices',
          },
          {
            id: '0.1.2',
            detail: 'React web applications across multiple web browsers',
          },
          {
            id: '0.1.3',
            detail:
              'Golang microservices on a Kubernetes implementation on AWS EC2 Instances',
          },
        ],
      },
      {
        id: '0.2',
        detail: 'Created and currently Lead Internal Frontend Developers Guild',
        subDetails: [
          {
            id: '0.2.1',
            detail:
              'Share development patterns and preferences to create consistent software solutions',
          },
          {
            id: '0.2.2',
            detail:
              'Research and share new development patterns to keep up with quickly advancing frontend technologies',
          },
        ],
      },
      {
        id: '0.3',
        detail:
          'Perform vital roles in Acquiring and Developing Engineering Talent',
        subDetails: [
          {
            id: '0.3.1',
            detail:
              'Manage and onboard Senior, Mid-Level, and Northeastern Co-op Software Engineers',
          },
          {
            id: '0.3.2',
            detail:
              'Interview and determine hiring of Senior, Mid-Level, and Entry-Level candidates',
          },
        ],
      },
      {
        id: '0.4',
        detail: 'Maintain intricate CI/CD Testing Pipeline',
        subDetails: [
          {
            id: '0.4.1',
            detail:
              'Created and maintain Cypress automation tests to run against our web applications in parallel quickly and stably in Travis-CI',
          },
          {
            id: '0.4.2',
            detail:
              'Created and maintain test setup and teardown infrastructure to spawn minimal testing environments which each execution',
          },
          {
            id: '0.4.3',
            detail:
              'Created and maintain Detox automation tests to run against our mobile applications',
          },
        ],
      },
      {
        id: '0.10',
        detail: 'Notable Development Projects Led and Developed',
        subDetails: [
          {
            id: '0.10.0',

            detail:
              'Electronic credit card and bank account payments via Stax and Spreedly',
          },
          {
            id: '0.10.1',

            detail:
              'Real-time location tracking via React, React-Native, AWS SNS, and Golang',
          },
          {
            id: '0.10.2',
            detail:
              'Geofencing via mobile app to determine arrival and departure from work sites',
          },
          {
            id: '0.10.3',

            detail:
              'GeoJSON/ Geometry infrastructure for US Census Tracts and Postal Codes',
          },
          {
            id: '0.10.4',

            detail:
              'Offline support for React-Native, making local changes and deferred server syncing',
          },
          {
            id: '0.10.5',
            detail:
              'Entirely new internal React and MUI administrative dashboard to pass SOC2 Compliance',
          },
        ],
      },
    ],
  },
  {
    keyTerms: [
      'React',
      'React Native',
      'Cypress',
      'Detox',
      'Upgrade',
      'Migrate',
      'Documentation',
    ],
    logo: '/dispatch.webp',
    companyURL: 'https://dispatch.me/',
    id: '1',
    company: 'Dispatch Technologies',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 10, year: 2020 }).toISOString(),
    endDate: set(new Date(), { month: 0, year: 2022 }).toISOString(),
    title: 'Software Engineer, Senior',
    details: [
      {
        id: '1.0',
        detail:
          'Supported Team Lead in development of frontend and backend features',
        subDetails: [
          {
            id: '1.0.0',
            detail:
              'Implemented a configurable infrastructure to provide a custom flow of screens/ forms in response to user interactions within React Native mobile application',
          },
          {
            id: '1.0.1',
            detail:
              'Implemented frontend Websocket infrastructure in pure javascript that is used commonly across React and React Native applications to ingest entity updates and chat',
          },
        ],
      },
      {
        id: '1.1',
        detail:
          'Led and released upgrades to React and React Native frameworks',
        subDetails: [
          {
            id: '1.1.0',
            detail: 'React 14 to 16 upgrade',
            subDetails: [
              {
                id: '1.1.0.0',
                detail: 'Migrated class components top functional components',
              },
              {
                id: '1.1.0.1',
                detail: 'Migrated lifecycle events to hooks',
              },
              {
                id: '1.1.0.2',
                detail:
                  'Upgraded and replaced deprecated dependencies and across all React web applications',
              },
            ],
          },
          {
            id: '1.1.1',
            detail: 'Conducted React Native 0.42 to 0.72 upgrade',
            subDetails: [
              {
                id: '1.1.1.0',
                detail:
                  'Upgraded and replaced deprecated dependencies and overhauled the installation scripts on a React Native mobile application',
              },
            ],
          },
        ],
      },
      {
        id: '1.2',
        detail:
          'Led and conducted large-scale e2e testing of the React and React Native applications',
        subDetails: [
          {
            id: '1.2.0',
            detail:
              'Collaborated with product to document most important features and user stories',
          },
          {
            id: '1.2.1',
            detail:
              'Created e2e tests in both Cypress and Detox to support documented, important features and user stories',
          },
        ],
      },
      {
        id: '1.3',
        detail:
          'Overhauled project planning documentation standards in Confluence to create a common format',
      },
      {
        id: '1.4',
        detail:
          'Created automation that took commits of a specific format and spawned human-readable documentation to reduce release complexity',
      },
    ],
  },
  {
    keyTerms: ['Migrate'],
    logo: '/dispatch.webp',
    companyURL: 'https://dispatch.me/',
    id: '2',
    company: 'Dispatch Technologies',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 10, year: 2018 }).toISOString(),
    endDate: set(new Date(), { month: 10, year: 2020 }).toISOString(),
    title: 'Software Engineer',
    details: [
      {
        id: '2.0',
        detail:
          'Supported product team in bugfixes, migrations, and testing infrastructure',
        subDetails: [
          {
            id: '2.0.1',
            detail:
              'Migrated entirety of a deprecated common react component repository into the modern syntax, standards, and reposirory',
          },
        ],
      },
    ],
  },
  {
    keyTerms: ['Angular', 'Configurable', 'Agile'],
    logo: '/fidelity.jpeg',
    companyURL: 'https://www.fidelity.com/',
    id: '3',
    company: 'Fidelity Investments',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 9, year: 2016 }).toISOString(),
    endDate: set(new Date(), { month: 10, year: 2018 }).toISOString(),
    title: 'Software Engineer',
    details: [
      {
        id: '3.0',
        detail:
          'Developed Angular web components, modules, and services for client facing applications',
        subDetails: [
          {
            id: '3.0.1',
            detail:
              'Created several portions of a fully configurable web framework to have no-code solutions to lay out different components',
          },
        ],
      },
      {
        id: '3.1',
        detail:
          'Worked as a part of an Agile team to deliver software on a bi-weekly sprint basis',
      },
      {
        id: '3.2',
        detail:
          'Collaborated with service teams to integrate endpoints with frontend component requirements',
      },
    ],
  },
];

const getExperiencesHandler = async (): Promise<Array<Experience>> => {
  return experiences;
};

export async function GET(request: Request) {
  const experiences = await getExperiencesHandler();
  return Response.json({ experiences });
}
