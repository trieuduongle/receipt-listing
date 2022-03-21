import { EnvironmentModel } from './environment.model';

const { NX_OFFLINE_RECEIPT_API_ORIGIN } = process.env;

export const environment: EnvironmentModel = {
  production: true,
  apiEndpoint: NX_OFFLINE_RECEIPT_API_ORIGIN || 'http://localhost:8080',
};
