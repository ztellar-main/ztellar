import { AxiosError } from 'axios';

export const axiosError = (err: any, errorSetter: any, errorValue: string) => {
  if (err instanceof AxiosError) {
    const error = err?.response?.data?.message || err?.message;

    if (error === errorValue) {
      errorSetter({
        message: error,
        status: 'error',
      });
    }
    return error;
  }
};
