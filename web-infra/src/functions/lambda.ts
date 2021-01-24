import * as awsServerlessExpress from "@vendia/serverless-express";
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// import the server factory function we created.
import { createApp } from "./server";

// Store a reference to the promise as we don't want to keep creating the server instance.
const appPromise = createApp();

export const nuxt = async (event: APIGatewayProxyEvent, context: Context) => {
  // should return a fastify instance once resolved.
  const app = await appPromise;

  // proxies the request to our underlying fastify server.
  return awsServerlessExpress.proxy(app.server, event, context, "PROMISE")
    .promise;
};
