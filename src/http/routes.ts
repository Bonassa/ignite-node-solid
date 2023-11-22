import { FastifyInstance } from 'fastify'

import { verifyJWT } from './middlewares/verify-jwt'

import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
