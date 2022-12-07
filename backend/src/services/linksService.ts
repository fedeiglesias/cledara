import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import Link from '../model/Link'

export default class LinkService {
  private readonly tableName: string = process.env.DYNAMODB_LINKS_TABLE_NAME ?? ''

  constructor (private readonly docClient: DocumentClient) { }

  async getAllLinks (sessionId: string): Promise<Link[]> {
    const links = await this.docClient.scan({
      TableName: this.tableName,
      FilterExpression: 'contains(sessionId, :sessionId)',
      ExpressionAttributeValues: {
        ':sessionId': sessionId
      }
    }).promise()

    return links.Items as Link[]
  }

  async createLink (link: Link): Promise<Link> {
    await this.docClient.put({
      TableName: this.tableName,
      Item: link
    }).promise()

    return link
  }
}
