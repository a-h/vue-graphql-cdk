import * as path from "path";
import * as awsServerlessExpress from "@vendia/serverless-express";
// @ts-ignore
import { Nuxt } from "nuxt-start";
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifyExpress from "fastify-express";

// https://logaretm.com/blog/2019-08-29-cost-effective-serverless-nuxt-js/
/**
 * Creates a fastify server with Nuxt middleware attached.
 **/
export const createApp = async () => {
  // Define a list of mime types that we will serve.
  // Let's serve everything using a wild card
  const binaryTypes = ["*/*"];

  // Pass in our custom server function, which uses the aws-serverless-proxy
  // to convert our default handler to a serverless compatible one.
  const server = fastify({
    serverFactory(handler) {
      return awsServerlessExpress.createServer(handler, null, binaryTypes);
    },
  });
  await server.register(fastifyExpress);

  //TODO: Don't serve this from API Gateway, move it to an S3 bucket.
  //TODO: Reduce the contents of the code bundle.
  // Serve the `.nuxt/dist` folder using the `/_nuxt` prefix.
  await server.register(fastifyStatic, {
    root: path.join(__dirname, "..", ".nuxt", "dist"),
    prefix: "/_nuxt/",
  });

  // In the Nuxt programmatic API
  // We need to explicitly set the dev to false.
  // https://github.com/nuxt/nuxt.js/issues/4292#issuecomment-507730032
  const nuxt = new Nuxt({ dev: false });

  // wait for nuxt to be ready.
  await nuxt.ready();
  server.use(nuxt.render);

  // wait for fastify to be ready.
  await server.ready();

  return server;
};
