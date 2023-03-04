const nextConfig = {
  reactStrictMode: false,
  env: {
    TEXT_TO_SPEECH: process.env.TEXT_TO_SPEECH,
    GPT_KEY: process.env.GPT_KEY,
  },
};

module.exports = nextConfig;
