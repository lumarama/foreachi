---
title: Serverless Websockets
permalink: /aws/serverless-websockets
---
# Using AWS Lambda to Handle Websocket Connections

AWS provides ability to handle websocket connections using serverless services only: Lambda, API Gateway. Most likely you will also need DynamoDB as well, though this isn't strictly required.

In this example we use [Serverless Framework](https://www.serverless.com/) to provision all AWS resourses, which is a much easier way than using AWS CloudForwation templates or configuring them manually via web UI. Under the hood serverless generates AWS CloudFormation templates.

We configure the same Lambda function to handle connect, disconnect, and default routes. 

Your serverless.yml should look as follows:

```yaml
service: backend

provider:
  name: aws
  region: us-east-2
  stage: dev
  runtime: nodejs12.x

functions:
  default:
    handler: src/handler.default
    events:
      - websocket:
          route: $connect
      - websocket:
          route: $disconnect
      - websocket:
          route: $default
```

src/handler.js:

```js
'use strict';

const response = (code, body) => {
  return { 
    statusCode: code, 
    body: body
  };
}

exports.default = async (event, context) => {

  switch(event.requestContext.routeKey) {
    case '$connect':
      // TODO
      break;

    case '$disconnect':
      // TODO
      break;

    case '$default':
    default:
      // TODO
  }

  // Return a 200 status to tell API Gateway the message was processed successfully. 
  // Otherwise, API Gateway will return a 500 to the client.
  return response(200, "Ok.");
}
```
