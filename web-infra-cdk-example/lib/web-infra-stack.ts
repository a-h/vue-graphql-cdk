import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as apigw from "@aws-cdk/aws-apigateway";

export class WebInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //TODO: Get a global version number from the git commit hash, or git history etc.
    //TODO: e.g. git rev-list --count HEAD
    const versionNumber = new Date().toISOString();
    const nuxt = new lambda.Function(this, "nuxtHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "lambda.nuxt",
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "dist")),
      memorySize: 1024,
      description: `Build time: ${versionNumber}`,
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, "nuxt", {
      handler: nuxt,
    });
  }
}
