export const liveIdErrorHandlerFunction = async (
  data: any,
  errorSetter: any
) => {
  if (!data) {
    errorSetter({
      message: 'Please enter your live id',
      status: 'error',
    });
    return 'error';
  }

  const regex = new RegExp(/[e/]/g);
  const regexed = data.match(regex);

  if (regexed) {
    errorSetter({
      message: 'Please enter numbers only',
      status: 'error',
    });
    return 'error';
  }

  if (data.length < 6 || data.length > 10) {
    errorSetter({
      message: 'Please enter atleast 6 - 10 characters only',
      status: 'error',
    });
    return 'error';
  }

  errorSetter({
    message: 'success',
    status: 'success',
  });
  return 'success';
};
