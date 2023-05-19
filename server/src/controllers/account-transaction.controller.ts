import {Filter, repository} from '@loopback/repository';
import {
  HttpErrors,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {Account, DailyBalance, Transaction} from '../models';
import {AccountRepository, DailyBalanceRepository} from '../repositories';

export class AccountTransactionController {
  constructor(
    @repository(AccountRepository)
    protected accountRepository: AccountRepository,
    @repository(DailyBalanceRepository)
    public dailyBalanceRepository: DailyBalanceRepository,
  ) {}

  @get('/accounts/{accountId}/transactions', {
    responses: {
      '200': {
        description: 'Array of Account has many Transaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaction)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('accountId') accountId: number,
    @param.query.object('filter') filter?: Filter<Transaction>,
  ): Promise<Transaction[]> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new HttpErrors.NotFound('Account not found');
    }
    return this.accountRepository.transactions(accountId).find(filter);
  }

  @post('/accounts/{accountId}/transactions', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaction)}},
      },
    },
  })
  async create(
    @param.path.number('accountId')
    accountId: typeof Account.prototype.accountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaction, {
            title: 'NewTransactionInAccount',
            exclude: ['transactionId', 'accountId'],
          }),
        },
      },
    })
    transaction: Omit<Transaction, 'transactionId'>,
  ): Promise<Transaction> {
    // Verificar se a conta existe
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new HttpErrors.NotFound('Account not found');
    }

    // Validar os dados da transação
    if (!transaction.amount || transaction.amount <= 0) {
      throw new HttpErrors.UnprocessableEntity('Invalid transaction amount');
    }
    if (!transaction.type) {
      throw new HttpErrors.UnprocessableEntity('Transaction type is required');
    }
    if (!transaction.date) {
      throw new HttpErrors.UnprocessableEntity('Transaction date is required');
    }
    if (!transaction.description) {
      throw new HttpErrors.UnprocessableEntity(
        'Transaction description is required',
      );
    }
    const createdTransaction = await this.accountRepository
      .transactions(accountId)
      .create(transaction);

    // Obter a data da transação para fins de agrupamento por dia
    const transactionDate = new Date(transaction.date);
    const formattedDate = transactionDate.toISOString().split('T')[0];

    // Verificar se já existe um registro de DailyBalance para a data da transação
    const existingDailyBalance = await this.dailyBalanceRepository.findOne({
      where: {
        accountId: accountId,
        date: formattedDate,
      },
    });

    if (existingDailyBalance) {
      // Atualizar o saldo diário existente somando ou subtraindo o valor da transação
      const updatedBalance = existingDailyBalance.balance + transaction.amount;
      existingDailyBalance.balance = updatedBalance;
      await this.dailyBalanceRepository.update(existingDailyBalance);
    } else {
      // Verificar se existe um saldo do dia anterior
      const previousDate = new Date(transactionDate);
      previousDate.setDate(transactionDate.getDate() - 1);
      const previousFormattedDate = previousDate.toISOString().split('T')[0];

      const previousDailyBalance = await this.dailyBalanceRepository.findOne({
        where: {
          accountId: accountId,
          date: previousFormattedDate,
        },
      });

      if (previousDailyBalance) {
        // Criar um novo registro de DailyBalance com o saldo do dia anterior somado ao valor da transação
        const newDailyBalance: DailyBalance = new DailyBalance({
          accountId: accountId,
          date: formattedDate,
          balance: previousDailyBalance.balance + transaction.amount,
        });
        await this.dailyBalanceRepository.create(newDailyBalance);
      } else {
        // Criar um novo registro de DailyBalance com o saldo da transação
        const newDailyBalance: DailyBalance = new DailyBalance({
          accountId: accountId,
          date: formattedDate,
          balance: transaction.amount,
        });
        await this.dailyBalanceRepository.create(newDailyBalance);
      }
    }

    return createdTransaction;
  }
}
