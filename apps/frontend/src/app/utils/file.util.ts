export const getExtension = (fileName: string) => {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
};
