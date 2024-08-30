export const descriptionErrorHandlerFunction = async (
  data: string,
  errorSetter: any,
  length: number
) => {
  if (!data) {
    errorSetter({
      message: 'Please enter your course description',
      status: 'error',
    });
    return 'error';
  }

  if (data.length > length) {
    errorSetter({
      message: `Only ${length} characters or fewer are allowed`,
      status: 'error',
    });
  }

  if (data.length < 10) {
    errorSetter({
      message: 'Please enter atleast 10 characters and above',
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
