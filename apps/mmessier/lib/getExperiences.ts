import { set } from 'date-fns';
import { Experience } from '../types';
import { v4 } from 'uuid';

const experiences: Array<Experience> = [
  {
    id: '0',
    company: 'Dispatch Technologies',
    location: 'Boston, MA',
    startDate: set(new Date(), { month: 10, year: 2018 }),
    title: 'Software Engineer, Team Lead',
    details: [
      {
        id: '0.1',

        detail:
          'Develop workforce management software on a React, React-Native, Typescript, Golang, and Postgres stack',
      },
      {
        id: '0.2',

        detail:
          'Troubleshoot and release on an AWS and Kubernetes implementation ',
      },
      {
        id: '0.3',

        detail:
          'Lead internal frontend developers guild to advance skills and modernize software',
      },
      {
        id: '0.4',

        detail:
          'Oversee and execute releases of mobile application to both Android and iOS devices',
      },
      {
        id: '0.5',

        detail:
          'Manage and onboard Senior, Mid-Level, and Northeastern Co-op Software Engineers',
      },
      {
        id: '0.6',
        detail:
          'Incepted, developed, and lead creation of a new internal administration dashboard ',
      },
      {
        id: '0.7',

        detail:
          'Maintained intricate CI/CD pipeline in Travis + Docker to complement advanced git flows',
      },
      {
        id: '0.8',

        detail:
          'Created and maintaining testing infrastructure for React, React-Native, Golang, and RoR repositories',
      },
      {
        id: '0.9',

        detail:
          'Matured Apps to pass PCI audits and development processes to pass SOC2 audits',
      },
      {
        id: '0.10',

        detail: 'Notable Development Projects Led and Developed:',
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
        ],
      },
    ],
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
