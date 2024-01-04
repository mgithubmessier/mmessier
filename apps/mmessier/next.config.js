//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

// starts a command line process to get the git hash
const commitHash = require('child_process')
  .execSync('git log --pretty=format:"%h" -n1')
  .toString()
  .trim();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  env: {
    COMMIT_HASH: commitHash,
  },
  experimental: {
    externalDir: true,
  },
  reactStrictMode: false,
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
