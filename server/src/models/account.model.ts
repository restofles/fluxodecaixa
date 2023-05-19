import {Entity, hasMany, model, property} from '@loopback/repository';
import {Transaction} from './transaction.model';
import {DailyBalance} from './daily-balance.model';

@model()
export class Account extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    required: false,
  })
  accountId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Transaction)
  transactions: Transaction[];

  @hasMany(() => DailyBalance)
  dailyBalances: DailyBalance[];

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
