# Build the site.
npm run build
# Deploy the CloudFormation Stack.
npx serverless deploy
# Copy the content to the S3 bucket.
aws s3 sync ./.nuxt/dist/client s3://`cat stack-outputs.json|jq -r ".StaticBucketName"`
