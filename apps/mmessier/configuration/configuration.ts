export type Configuration = {
  mmessierAPIHost?: string;
  authorizerAPIKey?: string;
  commitHash?: string;
};

export const configuration: Configuration = {
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  authorizerAPIKey: process.env.AUTHORIZER_API_KEY,
  commitHash: process.env.COMMIT_HASH,
};
