import {Entity, model, property} from '@loopback/repository';

@model()
export class DailyBalance extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  dailybalanceId?: number;

  @property({
    type: 'number',
    required: true,
  })
  accountId: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  constructor(data?: Partial<DailyBalance>) {
    super(data);
  }
}

export interface DailyBalanceRelations {
  // describe navigational properties here
}

export type DailyBalanceWithRelations = DailyBalance & DailyBalanceRelations;
