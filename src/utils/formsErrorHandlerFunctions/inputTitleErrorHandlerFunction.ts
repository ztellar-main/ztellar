import axios, { AxiosError } from 'axios';

export const inputTitleErrorHandlerFunction = async (
  data: any,
  errorSetter: any,
  token: string,
  axiosPath: string,
  length: any
) => {
  const regex = new RegExp(/[\\/]/g);
  const regexed = data.match(regex);

  if (!data) {
    errorSetter({
      message: 'Please enter your course title',
      status: 'error',
    });
    return 'error';
  }

  if (regexed) {
    errorSetter({
      message: "This characters are not allowed ('/ , { , \\ ,  }')",
      status: 'error',
    });
    return 'error';
  }

  if (data.length > length) {
    errorSetter({
      message: 'Only 50 characters or fewer are allowed',
      status: 'error',
    });
    return 'error';
  }

  if (data.length < 10) {
    errorSetter({
      message: 'Please enter atleast 10 characters and above',
      status: 'error',
    });
    return 'error';
  }

  try {
    await axios({
      method: 'post',
      url: axiosPath,
      data: { title: data },
      headers: {
        authorization: `Token ${token}`,
      },
    });
    errorSetter({
      message: 'success',
      status: 'success',
    });
    return 'success';
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err?.response?.data?.message || err?.message;
      errorSetter({
        message: error,
        status: 'error',
      });
      return 'error';
    }
  }
};
