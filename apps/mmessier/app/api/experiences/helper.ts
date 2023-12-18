import { set } from 'date-fns';
import { Experience } from '@mmessier/types';

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
    startDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 0,
      year: 2022,
    }).toISOString(),
    title: 'Software Engineer, Team Lead',
    details: [
      {
        detail: 'Oversee and Execute Software Development and Releases',
        subDetails: [
          {
            detail:
              'React Native mobile application to both Android and iOS devices',
          },
          {
            detail: 'React web applications across multiple web browsers',
          },
          {
            detail:
              'Golang microservices on a Kubernetes implementation on AWS EC2 Instances',
          },
        ],
      },
      {
        detail: 'Created and currently Lead Internal Frontend Developers Guild',
        subDetails: [
          {
            detail:
              'Share development patterns and preferences to create consistent software solutions',
          },
          {
            detail:
              'Research and share new development patterns to keep up with quickly advancing frontend technologies',
          },
        ],
      },
      {
        detail:
          'Perform vital roles in Acquiring and Developing Engineering Talent',
        subDetails: [
          {
            detail:
              'Manage and onboard Senior, Mid-Level, and Northeastern Co-op Software Engineers',
          },
          {
            detail:
              'Interview and determine hiring of Senior, Mid-Level, and Entry-Level candidates',
          },
        ],
      },
      {
        detail: 'Maintain intricate CI/CD Testing Pipeline',
        subDetails: [
          {
            detail:
              'Created and maintain Cypress automation tests to run against our web applications in parallel quickly and stably in Travis-CI',
          },
          {
            detail:
              'Created and maintain test setup and teardown infrastructure to spawn minimal testing environments which each execution',
          },
          {
            detail:
              'Created and maintain Detox automation tests to run against our mobile applications',
          },
        ],
      },
      {
        detail: 'Notable Development Projects Led and Developed',
        subDetails: [
          {
            detail:
              'Electronic credit card and bank account payments via Stax and Spreedly',
          },
          {
            detail:
              'Real-time location tracking via React, React-Native, AWS SNS, and Golang',
          },
          {
            detail:
              'Geofencing via mobile app to determine arrival and departure from work sites',
          },
          {
            detail:
              'GeoJSON/ Geometry infrastructure for US Census Tracts and Postal Codes',
          },
          {
            detail:
              'Offline support for React-Native, making local changes and deferred server syncing',
          },
          {
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
    startDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 10,
      year: 2020,
    }).toISOString(),
    endDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 0,
      year: 2022,
    }).toISOString(),
    title: 'Software Engineer, Senior',
    details: [
      {
        detail:
          'Supported Team Lead in development of frontend and backend features',
        subDetails: [
          {
            detail:
              'Implemented a configurable infrastructure to provide a custom flow of screens/ forms in response to user interactions within React Native mobile application',
          },
          {
            detail:
              'Implemented frontend Websocket infrastructure in pure javascript that is used commonly across React and React Native applications to ingest entity updates and chat',
          },
        ],
      },
      {
        detail:
          'Led and released upgrades to React and React Native frameworks',
        subDetails: [
          {
            detail: 'React 14 to 16 upgrade',
            subDetails: [
              {
                detail: 'Migrated class components top functional components',
              },
              {
                detail: 'Migrated lifecycle events to hooks',
              },
              {
                detail:
                  'Upgraded and replaced deprecated dependencies and across all React web applications',
              },
            ],
          },
          {
            detail: 'Conducted React Native 0.42 to 0.72 upgrade',
            subDetails: [
              {
                detail:
                  'Upgraded and replaced deprecated dependencies and overhauled the installation scripts on a React Native mobile application',
              },
            ],
          },
        ],
      },
      {
        detail:
          'Led and conducted large-scale e2e testing of the React and React Native applications',
        subDetails: [
          {
            detail:
              'Collaborated with product to document most important features and user stories',
          },
          {
            detail:
              'Created e2e tests in both Cypress and Detox to support documented, important features and user stories',
          },
        ],
      },
      {
        detail:
          'Overhauled project planning documentation standards in Confluence to create a common format',
      },
      {
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
    startDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 10,
      year: 2018,
    }).toISOString(),
    endDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 10,
      year: 2020,
    }).toISOString(),
    title: 'Software Engineer',
    details: [
      {
        detail:
          'Supported product team in bugfixes, migrations, and testing infrastructure',
        subDetails: [
          {
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
    startDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 9,
      year: 2016,
    }).toISOString(),
    endDate: set(new Date(), {
      date: 1,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0,
      month: 10,
      year: 2018,
    }).toISOString(),
    title: 'Software Engineer',
    details: [
      {
        detail:
          'Developed Angular web components, modules, and services for client facing applications',
        subDetails: [
          {
            detail:
              'Created several portions of a fully configurable web framework to have no-code solutions to lay out different components',
          },
        ],
      },
      {
        detail:
          'Worked as a part of an Agile team to deliver software on a bi-weekly sprint basis',
      },
      {
        detail:
          'Collaborated with service teams to integrate endpoints with frontend component requirements',
      },
    ],
  },
];
