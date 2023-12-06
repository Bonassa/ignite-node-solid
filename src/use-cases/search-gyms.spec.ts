import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Example 01',
      description: null,
      phone: null,
      latitude: -25.123,
      longitude: -53.123,
    })

    await gymsRepository.create({
      title: 'Example 02',
      description: null,
      phone: null,
      latitude: -25.123,
      longitude: -53.123,
    })

    const { gyms } = await sut.execute({
      query: '01',
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Example 01' })])
  })

  it('should be able to search for a gym with more than the limit of elements in a page', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Example ${i}`,
        description: null,
        phone: null,
        latitude: -25.123,
        longitude: -53.123,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Example',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Example 21' }),
      expect.objectContaining({ title: 'Example 22' }),
    ])
  })
})
