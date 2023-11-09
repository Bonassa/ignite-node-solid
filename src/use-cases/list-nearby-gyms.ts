import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface ListNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface ListNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class ListNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: ListNearbyGymsUseCaseRequest): Promise<ListNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
