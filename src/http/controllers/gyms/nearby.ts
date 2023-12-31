import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeListNearbyGymsUseCase } from '@/use-cases/factories/make-list-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const listNearbyGyms = makeListNearbyGymsUseCase()

  const { gyms } = await listNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
