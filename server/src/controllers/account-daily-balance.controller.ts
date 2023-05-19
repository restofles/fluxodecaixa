import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {DailyBalance} from '../models';
import {AccountRepository} from '../repositories';

export class AccountDailyBalanceController {
  constructor(
    @repository(AccountRepository)
    protected accountRepository: AccountRepository,
  ) {}

  // @get('/accounts/{accountId}/daily-balances', {
  //   responses: {
  //     '200': {
  //       description: 'Array of Account has many DailyBalance',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(DailyBalance)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.path.number('accountId') accountId: number,
  //   @param.query.object('filter') filter?: Filter<DailyBalance>,
  // ): Promise<DailyBalance[]> {
  //   return this.accountRepository.dailyBalances(accountId).find(filter);
  // }

  @get('/accounts/{accountId}/daily-balances/{date}', {
    responses: {
      '200': {
        description: 'Array of Account has many DailyBalance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DailyBalance)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('accountId') accountId: number,
    @param.path.string('date') date: string,
    @param.query.object('filter') filter?: Filter<DailyBalance>,
  ): Promise<DailyBalance[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const whereFilter = {
      accountId: accountId,
      date: {
        gte: startDate.toISOString(),
        lt: endDate.toISOString(),
      },
    };

    if (filter) {
      filter.where = filter.where
        ? {and: [filter.where, whereFilter]}
        : whereFilter;
    } else {
      filter = {where: whereFilter};
    }

    return this.accountRepository.dailyBalances(accountId).find(filter);
  }
}
