import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Account, AccountRelations, Transaction, DailyBalance} from '../models';
import {TransactionRepository} from './transaction.repository';
import {DailyBalanceRepository} from './daily-balance.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.accountId,
  AccountRelations
> {

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Account.prototype.accountId>;

  public readonly dailyBalances: HasManyRepositoryFactory<DailyBalance, typeof Account.prototype.accountId>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>, @repository.getter('DailyBalanceRepository') protected dailyBalanceRepositoryGetter: Getter<DailyBalanceRepository>,
  ) {
    super(Account, dataSource);
    this.dailyBalances = this.createHasManyRepositoryFactoryFor('dailyBalances', dailyBalanceRepositoryGetter,);
    this.registerInclusionResolver('dailyBalances', this.dailyBalances.inclusionResolver);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
  }
}
