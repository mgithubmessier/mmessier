export type Configuration = {
  mmessierNextJSJWTSecret?: string;
  mmessierAPIHost?: string;
  commitHash?: string;
  authorizerAPIKey?: string;
};

export const configuration: Configuration = {
  mmessierNextJSJWTSecret: process.env.MMESSIER_NEXTJS_JWT_SECRET,
  mmessierAPIHost: process.env.MMESSIER_API_HOST,
  commitHash: process.env.COMMIT_HASH,
  authorizerAPIKey: process.env.AUTHORIZER_API_KEY,
};
