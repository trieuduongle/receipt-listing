// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  production: false,
  // apiEndpoint: 'https://receipt-backend.onrender.com',
  apiEndpoint: 'http://localhost:8080',
};
