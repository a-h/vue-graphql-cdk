# vue-graphql-cdk

A slice of the application architecture.

* web
  * CDK construct for the Web application.
  * created using `npx create-nuxt-app`, then adding serverless framework deployment on top.
  * TODO: Stop serving the static content from API Gateway, and use S3 instead.
* api
  * CDK app, created using `npx cdk init app -l typescript`.
  * Added GraphQL resolvers directly into the project.
* infra
  * This will contains a CloudFront (CDN) distribution that will serve both the API and the Nuxt application
