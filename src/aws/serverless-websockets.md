---
title: Serverless Websockets
permalink: /aws/serverless-websockets
---
# Using AWS Lambda to Handle Websocket Connections

AWS provides ability to handle websocket connections using serverless services only: Lambda, API Gateway. Most likely you will also need DynamoDB, though this isn't strictly required.

In this example we use [Serverless Framework](https://www.serverless.com/) to build a very simple app that echoes back all the messages it receives via websocket.  Serverless framework provides a much easier way to provision cloud services than AWS CloudForwation templates or configuring them manually via AWS Web UI. *NOTE: under the hood serverless generates AWS CloudFormation templates.*

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

We configured the same Lambda function to handle connect, disconnect, and default (message receiving) routes. Note **handler: src/handler.default** above: **src/handler** is the filename where the Lambda function is defined, and **default** is the name of the function itself.

In the example we simply echo back the message we received via websocket: **event.body** contains the message, **event.requestContext.connectionId** - current connection id. You will most likely want to store all active connection ids to database (i.e. DynamoDB), so you can forward messages between the connected clients, instead of simply echoing it back to the same connection.

src/handler.js:

```js
'use strict';

const response = (code, body) => {
  return { 
    statusCode: code, 
    body: body
  };
}

const echoReply = (event) => {
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });
  await apigwManagementApi.postToConnection({ 
    ConnectionId: event.requestContext.connectionId,
    Data: event.body
  }).promise();
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
      echoReply(event);
  }

  // Return a 200 status to tell API Gateway the message was processed successfully. 
  // Otherwise, API Gateway will return a 500 to the client.
  return response(200, "Ok.");
}
```
