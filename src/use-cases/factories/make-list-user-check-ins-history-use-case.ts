import { ListUserCheckInsHistoryUseCase } from '../list-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeListUserCheckInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new ListUserCheckInsHistoryUseCase(checkInRepository)

  return useCase
}
