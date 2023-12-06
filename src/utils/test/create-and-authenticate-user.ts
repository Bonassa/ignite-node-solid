import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface JwtPayload {
  sub: string
  iat: number
}

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123123',
  })

  const { token } = authResponse.body

  const { sub } = app.jwt.decode(token) as JwtPayload

  return {
    token,
    userId: sub,
  }
}
