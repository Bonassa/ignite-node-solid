import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { ListNearbyGymsUseCase } from './list-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: ListNearbyGymsUseCase

describe('List Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new ListNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to list nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -25.123,
      longitude: -53.123,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -26.123,
      longitude: -54.123,
    })

    const { gyms } = await sut.execute({
      userLatitude: -25.123,
      userLongitude: -53.123,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
