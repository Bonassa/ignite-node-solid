import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'example-01',
      title: 'example',
      description: '',
      phone: '',
      latitude: new Decimal(-25.123),
      longitude: new Decimal(-53.123),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'example-01',
      gymId: 'example-01',
      userLatitude: -25.123,
      userLongitude: -53.123,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shouldn`t be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'example-01',
      gymId: 'example-01',
      userLatitude: -25.123,
      userLongitude: -53.123,
    })

    await expect(() =>
      sut.execute({
        userId: 'example-01',
        gymId: 'example-01',
        userLatitude: -25.123,
        userLongitude: -53.123,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'example-01',
      gymId: 'example-01',
      userLatitude: -25.123,
      userLongitude: -53.123,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'example-01',
      gymId: 'example-01',
      userLatitude: -25.123,
      userLongitude: -53.123,
    })

    expect(checkIn.id).toBeTruthy()
  })

  it('shouldn`t be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: 'example-02',
      title: 'example',
      description: '',
      phone: '',
      latitude: new Decimal(-26.123),
      longitude: new Decimal(-54.123),
    })

    await expect(() =>
      sut.execute({
        userId: 'example-02',
        gymId: 'example-01',
        userLatitude: -26.123,
        userLongitude: -54.123,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
