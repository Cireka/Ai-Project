const nextConfig = {
  reactStrictMode: false,
  env: {
    Text_Speech: process.env.TEXT_TO_SPEECH ,
    GPT_KEY: process.env.GPT_KEY,
  },
};

module.exports = nextConfig;
