import { Configuration } from '../types';

export const configuration: Configuration = {
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  mmessierAPIToken: process.env.MMESSIER_API_TOKEN,
  commitHash: process.env.COMMIT_HASH,
};
