import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const dynamoDBClient = (): DocumentClient => {
  const offline = Boolean(process.env.IS_OFFLINE)
  if (offline) {
    const port = Number(process.env.DYNAMODB_PORT)
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: `http://localhost:${port}`
    })
  }

  return new AWS.DynamoDB.DocumentClient()
}

export default dynamoDBClient
