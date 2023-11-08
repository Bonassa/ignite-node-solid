import { randomUUID } from 'node:crypto'

import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => {
      const isOnSameDate = dayjs(date).isSame(item.created_at, 'day')

      return item.user_id === userId && isOnSameDate
    })

    return checkIn ?? null
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,

      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}