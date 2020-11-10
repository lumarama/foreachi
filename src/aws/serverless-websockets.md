---
title: Serverless Websockets
permalink: /aws/serverless-websockets
---
# Using Serverless Framework to Handle Websocket connections

In this example we configure the same Lambda function to handle connect, disconnect, and default routes.

serverless.yml:

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
