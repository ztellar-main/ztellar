export const fileErrorHandlerFunction = async (data: any, errorSetter: any) => {
  if (!data) {
    errorSetter({
      message: 'Please select a video',
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
