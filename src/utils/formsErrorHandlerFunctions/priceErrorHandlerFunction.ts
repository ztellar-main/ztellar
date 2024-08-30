export const priceErrorHandlerFunction = async (
  data: string,
  errorSetter: any
) => {
  if (!data) {
    errorSetter({
      message: 'Please enter your course price',
      status: 'error',
    });
    return 'error';
  }

  if (Number(data) < 50) {
    errorSetter({
      message: 'Price must be 50 pesos and above',
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
