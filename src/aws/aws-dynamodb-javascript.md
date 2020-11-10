# Using AWS DynamoDB with JavaScript

The following are examples of using CosmosDB from a Lambda function.

Initialization:

```js
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });
const { CONNECTIONS_TABLE } = process.env;
```

Create item:

```js
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
```

Delete item:

```js
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
```

You generally don't want to use scan command for production, because it extremely inefficient and will scan your entire database.
You can probably only use it if you 100% sure that your database is going to be very small.

```js
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
```
