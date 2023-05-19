import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Account} from '../models';
import {AccountRepository, TransactionRepository} from '../repositories';

export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
    @repository(TransactionRepository)
    public transactionRepository: TransactionRepository,
  ) {}

  @post('/accounts')
  @response(200, {
    description: 'Account model instance',
    content: {'application/json': {schema: getModelSchemaRef(Account)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccount',
            exclude: ['accountId'],
          }),
        },
      },
    })
    account: Omit<Account, 'accountId'>,
  ): Promise<Account> {
    return this.accountRepository.create(account);
  }

  @get('/accounts/count')
  @response(200, {
    description: 'Account model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Account) where?: Where<Account>): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @get('/accounts')
  @response(200, {
    description: 'Array of Account model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Account, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Account) filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.accountRepository.find(filter);
  }

  @patch('/accounts')
  @response(200, {
    description: 'Account PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.updateAll(account, where);
  }

  @get('/accounts/{accountId}')
  @response(200, {
    description: 'Account model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Account, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('accountId') accountId: number,
    @param.filter(Account, {exclude: 'where'})
    filter?: FilterExcludingWhere<Account>,
  ): Promise<Account> {
    return this.accountRepository.findById(accountId, filter);
  }

  @patch('/accounts/{accountId}')
  @response(204, {
    description: 'Account PATCH success',
  })
  async updateById(
    @param.path.number('accountId') accountId: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
  ): Promise<void> {
    await this.accountRepository.updateById(accountId, account);
  }

  @put('/accounts/{accountId}')
  @response(204, {
    description: 'Account PUT success',
  })
  async replaceById(
    @param.path.number('accountId') accountId: number,
    @requestBody() account: Account,
  ): Promise<void> {
    await this.accountRepository.replaceById(accountId, account);
  }

  @del('/accounts/{accountId}')
  @response(204, {
    description: 'Account DELETE success',
  })
  async deleteById(
    @param.path.number('accountId') accountId: number,
  ): Promise<void> {
    await this.accountRepository.deleteById(accountId);
  }
}
