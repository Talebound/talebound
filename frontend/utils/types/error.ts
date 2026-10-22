import { AxiosHeaders } from 'axios';
import { upperFirst } from 'lodash';

export interface TaleboundError {
  code: string;
  message: string;
  response: {
    data: {
      code: number;
      message: string;
    };
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
  };
}

const isTaleboundError = (error: unknown): error is TaleboundError => {
  return (error as TaleboundError)?.response?.data?.message !== undefined;
};

export const parseError = (error: unknown): string | undefined => {
  if (error === undefined || error === null) {
    return undefined;
  }
  if (typeof error === 'string') {
    return upperFirst(error);
  }
  if (isTaleboundError(error)) {
    return upperFirst(error.response.data.message);
  }
  if ((error as Error).message) {
    return upperFirst((error as Error).message);
  }
  return 'Unknown error';
};
