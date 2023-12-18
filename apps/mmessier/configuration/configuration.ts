export type Configuration = {
  mmessierAPIHost?: string;
  mmessierAPIToken?: string;
  commitHash?: string;
};

export const configuration: Configuration = {
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  mmessierAPIToken: process.env.MMESSIER_API_TOKEN,
  commitHash: process.env.COMMIT_HASH,
};
