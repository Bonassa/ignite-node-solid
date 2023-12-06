import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('[E2E] Create Check-In Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Example',
        latitude: -25.123,
        longitude: -53.123,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -25.123,
        longitude: -53.123,
      })

    expect(response.statusCode).toEqual(201)
  })
})
