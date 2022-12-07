import fetch from 'node-fetch'
import { APIGatewayProxyResult } from 'aws-lambda'
import { IAuthorizedEvent } from 'middy-middleware-jwt-auth'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { linkService } from '../../services'
import { v4 } from 'uuid'
import Link from '../../model/Link'

export const getAllLinks = middyfy(true, async (evt: IAuthorizedEvent): Promise<APIGatewayProxyResult> => {
  const sessionId = evt.auth?.payload.session
  const links = await linkService.getAllLinks(sessionId)
  return formatJSONResponse({ links })
})

export const createLink = middyfy(true, async (evt: IAuthorizedEvent): Promise<APIGatewayProxyResult> => {
  const sessionId = evt.auth?.payload.session
  // @ts-expect-error
  const url = evt.body.url
  let title = 'No title'

  const abortController = new AbortController()
  const timeoutId = setTimeout(() => abortController.abort(), 5000)

  try {
    const res = await fetch(url, { signal: abortController.signal })
    const html = await res.text()
    title = html.split('<title>')[1].split('</title>')[0]
    clearTimeout(timeoutId)
  } catch (e) {
    // console.error('Timeout triying to get title')
  }

  const link: Link = {
    id: v4(),
    title,
    url,
    sessionId,
    createdAt: new Date().toISOString()
  }

  try {
    const newLink = await linkService.createLink(link)
    return formatJSONResponse({ newLink })
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
})
