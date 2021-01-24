import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "web-infra",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: {
    nuxt: {
      name: "nuxt",
      handler: "src/functions/lambda.nuxt",
      timeout: 20,
      events: [
        {
          http: {
            method: "ANY",
            path: "/",
          },
        },
        {
          http: {
            method: "ANY",
            path: "/{proxy+}",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
