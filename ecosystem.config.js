require('dotenv').config();

const {
  // eslint-disable-next-line no-unused-vars
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', DEPLOY_REPO, DEPLOY_PRE_SETUP,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './mesto-project-plus/dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}current`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
