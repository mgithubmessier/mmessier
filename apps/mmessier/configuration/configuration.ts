export type Configuration = {
  mmessierNextJSJWTSecret?: string;
  mmessierAPIHost?: string;
  authorizerAPIKey?: string;
  commitHash?: string;
};

export const configuration: Configuration = {
  mmessierNextJSJWTSecret: process.env.MMESSIER_NEXTJS_JWT_SECRET,
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  authorizerAPIKey: process.env.AUTHORIZER_API_KEY,
  commitHash: process.env.COMMIT_HASH,
};
