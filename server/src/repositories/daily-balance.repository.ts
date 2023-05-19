import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {DailyBalance, DailyBalanceRelations} from '../models';

export class DailyBalanceRepository extends DefaultCrudRepository<
  DailyBalance,
  typeof DailyBalance.prototype.dailybalanceId,
  DailyBalanceRelations
> {
  constructor(@inject('datasources.MySQL') dataSource: MySqlDataSource) {
    super(DailyBalance, dataSource);
  }
}
