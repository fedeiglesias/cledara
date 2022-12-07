import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpErrorHandler from '@middy/http-error-handler'
import JWTAuthMiddleware, { EncryptionAlgorithms } from 'middy-middleware-jwt-auth'

export const middyfy = (credentialsRequired: boolean, handler): Function => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(httpHeaderNormalizer())
    .use(httpErrorHandler())
    .use(JWTAuthMiddleware({
      /** Algorithm to verify JSON web token signature */
      algorithm: EncryptionAlgorithms.HS256,
      /** An optional boolean that enables making authorization mandatory */
      credentialsRequired,
      /** A string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA */
      secretOrPublicKey: String(process.env.JWT_SECRET)
    }))
}
