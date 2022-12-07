import dynamoDBClient from '../model'
import LinkService from './linksService'

export const linkService = new LinkService(dynamoDBClient())
