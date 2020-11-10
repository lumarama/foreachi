---
title: Serverless Websockets
permalink: /aws/serverless-websockets
---
# Using Lambda and DynamoDB to Handle Websocket Connections

## Lambda Function as Websocket Handler

AWS provides ability to handle websocket connections using serverless services only: Lambda functions and API Gateway. Most likely you will also need DynamoDB, though this isn't strictly required.

This example shows [Serverless Framework](https://www.serverless.com/) configuration file to provision required AWS services, and JavaScript Lambda function that handles websocket connections.

Your **serverless.yml** should look as follows:

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

In the example we echo back the message we receive via websocket: **event.body** contains the message, **event.requestContext.connectionId** - current connection id.

**src/handler.js**:

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

## DynamoDB for ConnectionIds

You will most likely want to store all active connection ids to database (i.e. DynamoDB), so you can forward messages between the connected clients, instead of simply echoing it back to the same connection. 

In this case your **serverless.yml** should look as follows:

```yml
service: backend

provider:
  name: aws
  region: us-east-2
  stage: dev
  runtime: nodejs12.x
  environment:
    CONNECTIONS_TABLE: ${self:service}-${opt:stage, self:provider.stage}-connections

  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.CONNECTIONS_TABLE}"

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

resources:
  Resources:
    ConnectionsTable:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          - AttributeName: connectionId
            AttributeType: S
        KeySchema:
          - AttributeName: connectionId
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST
        TableName: ${self:provider.environment.CONNECTIONS_TABLE}
```

**src/handler.js**:

```js
'use strict';
const Conn = require('./db/connections');

const response = (code, body) => {
  return { 
    statusCode: code, 
    body: body
  };
}

const connect = async (event) => {
  try {
    await Conn.createConnection(event.requestContext.connectionId);
  } catch (e) {
    return response(500, 'Failed to connect: ' + JSON.stringify(e));
  }

  return response(200, 'Connected.');
};

const disconnect = async (event) => {
  try {
    await Conn.deleteConnection(event.requestContext.connectionId);
  } catch (err) {
    return response(500, 'Failed to disconnect: ' + JSON.stringify(err));
  }

  return response(200, 'Disconnected.');
};

const sendMessage = async (event) => {

  let connectionIds = await Conn.getConnectionIds();
  
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });
  
  const postCalls = connectionIds.map(async (item) => {
    try {
      console.log(`Sending to ${item.connectionId}: ${event.body}`);
      await apigwManagementApi.postToConnection({ 
        ConnectionId: item.connectionId, 
        Data: event.body
      }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.info(`Deleting stale connection: ${item.connectionId}`);
        await Conn.deleteConnection(item.connectionId);
      } else {
        throw e;
      }
    }
  });
  
  try {
    await Promise.all(postCalls);
  } catch (e) {
    return response(500, e.stack);
  }

  return response(200, 'Data sent.');
};

exports.default = async (event, context) => {

  let resp;

  switch(event.requestContext.routeKey) {
    case '$connect':
      resp = connect(event);
      break;

    case '$disconnect':
      resp = disconnect(event);
      break;

    case '$default':
    default:
      resp = sendMessage(event);
  }

  // Return a 200 status to tell API Gateway the message was processed successfully. 
  // Otherwise, API Gateway will return a 500 to the client.
  return resp;
}
```

**src/db/connections.js**:

```js
'use strict';
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });
const { CONNECTIONS_TABLE } = process.env;

/**
 * @param {string} connectionId
 */
const createConnection = async (connectionId) => {
  await ddb.put({
    TableName: CONNECTIONS_TABLE,
    Item: {
      connectionId: connectionId
    }
  }).promise();
};

/**
 * @param {string} connectionId 
 */
const deleteConnection = async (connectionId) => {
  await ddb.delete({
    TableName: CONNECTIONS_TABLE,
    Key: {
      connectionId: connectionId
    }
  }).promise();
};

/**
 * @returns {Promise<Array<{connectionId:string}>>}
 */
const getConnectionIds = async () => {
  let scanData = await ddb.scan({
    TableName: CONNECTIONS_TABLE,
    ProjectionExpression: 'connectionId' 
  }).promise();

  return scanData.Items;
};

module.exports = {
    createConnection,
    deleteConnection,
    getConnectionIds
};
```
