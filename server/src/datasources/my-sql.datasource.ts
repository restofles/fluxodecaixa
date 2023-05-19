import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MySQL',
  connector: 'mysql',
  url: '',
  host: 'robb0498.publiccloud.com.br',
  port: 3306,
  user: 'resto_fluxo',
  password: 'Opah#102030',
  database: 'restofles_fluxo_caixa'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MySqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MySQL';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MySQL', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
