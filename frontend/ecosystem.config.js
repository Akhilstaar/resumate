module.exports = {
  apps: [
    {
      script: 'npm',
      args: 'start',
      watch: true,
      autorestart: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
