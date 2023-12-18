export type Configuration = {
  mmessierAPIHost?: string;
  mmessierAPIKey?: string;
  commitHash?: string;
};

export const configuration: Configuration = {
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  mmessierAPIKey: process.env.MMESSIER_API_KEY,
  commitHash: process.env.COMMIT_HASH,
};
