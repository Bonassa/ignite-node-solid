import type { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface ListUserCheckInsHistoryUseCaseRequest {
  userId: string
  page?: number
}

interface ListUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class ListUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: ListUserCheckInsHistoryUseCaseRequest): Promise<ListUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
