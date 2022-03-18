import { HttpResponse } from '~/core';
import { isNullOrUndefined } from './value.util';

const serializeValue = (value: any) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  switch (typeof value) {
    case 'object':
      return JSON.stringify(value);
    case 'undefined':
      return '';
    default:
      return value;
  }
};

export const buildParams = (
  paramsObject: Record<string, any>,
  allowEmptyParamValue = false
) => {
  return Object.keys(paramsObject).reduce((paramsString, key) => {
    const value = serializeValue(paramsObject[key]);
    const serialized = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}`;

    if (!allowEmptyParamValue && isNullOrUndefined(value)) {
      return paramsString;
    }

    return !paramsString ? `?${serialized}` : `${paramsString}&${serialized}`;
  }, '');
};

export const extractHttpResponse = <Data extends object>(
  response: HttpResponse<Data>
) => response.data;
