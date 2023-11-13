import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { ListNearbyGymsUseCase } from '../list-nearby-gyms'

export function makeListNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new ListNearbyGymsUseCase(gymsRepository)

  return useCase
}
