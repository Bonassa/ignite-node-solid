import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('[E2E] Check-In History Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token, userId } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Example',
        latitude: -25.123,
        longitude: -53.123,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: userId,
        },
        {
          gym_id: gym.id,
          user_id: userId,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
    expect(response.body.checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: gym.id,
          user_id: userId,
        }),
      ]),
    )
  })
})
