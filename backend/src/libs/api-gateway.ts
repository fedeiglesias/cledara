import type { APIGatewayProxyResult } from 'aws-lambda'

export const formatJSONResponse = (response: Record<string, unknown>): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify(response)
  }
}
