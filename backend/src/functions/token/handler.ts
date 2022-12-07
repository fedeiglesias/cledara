import { APIGatewayProxyResult } from 'aws-lambda'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { sign } from 'jsonwebtoken'
import { v4 } from 'uuid'

export const getToken = middyfy(false, async (): Promise<APIGatewayProxyResult> => {
  const secret = String(process.env.JWT_SECRET)
  const token = sign({ session: v4() }, secret)
  return formatJSONResponse({ token })
})
