export const catchAsync = async (callback: () => any, onError: (arg0: unknown) => void) => {
  try {
    await callback();
  } catch (e) {
    onError(e);
  }
};
