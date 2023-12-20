export type Configuration = {
  mmessierAPIHost?: string;
  experienceAPIKey?: string;
  commitHash?: string;
};

export const configuration: Configuration = {
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  experienceAPIKey: process.env.EXPERIENCE_API_KEY,
  commitHash: process.env.COMMIT_HASH,
};
