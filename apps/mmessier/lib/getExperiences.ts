import { set } from 'date-fns';
import { Experience } from '../types';

const experiences: Array<Experience> = [
  {
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
              'GeoJSON/Geometry infrastructure for US Census Tracts and Postal Codes',
          },
          {
            id: '0.10.4',

            detail:
              'Offline support for React-Native, making local changes and deferred server syncing',
          },
          {
            id: '0.10.5',
            detail:
              'Entirely new internal React + MUI administration dashboard to pass SOC2 Compliance',
          },
        ],
      },
    ],
  },
  {
    logo: '/dispatch.webp',
    companyURL: 'https://dispatch.me/',
    id: '1',
    company: 'Dispatch Technologies',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 10, year: 2020 }).toISOString(),
    endDate: set(new Date(), { month: 0, year: 2022 }).toISOString(),
    title: 'Senior Software Engineer',
    details: [],
  },
  {
    logo: '/dispatch.webp',
    companyURL: 'https://dispatch.me/',
    id: '2',
    company: 'Dispatch Technologies',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 10, year: 2018 }).toISOString(),
    endDate: set(new Date(), { month: 10, year: 2020 }).toISOString(),
    title: 'Software Engineer',
    details: [],
  },
  {
    logo: '/fidelity.jpeg',
    companyURL: 'https://www.fidelity.com/',
    id: '3',
    company: 'Fidelity Investments',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 9, year: 2016 }).toISOString(),
    endDate: set(new Date(), { month: 10, year: 2018 }).toISOString(),
    title: 'Software Engineer',
    details: [],
  },
];

export const getExperiences = async (): Promise<Array<Experience>> => {
  // const response = await fetch('https://jsonplaceholder.typicode.com/users');
  // if (!response.ok) {
  //   throw new Error('encountered error while retrieved experiences');
  // }
  return experiences;
};

export const getExperience = async (
  experienceID: string
): Promise<Experience | undefined> => {
  return experiences.find(({ id }) => id === experienceID);
};
