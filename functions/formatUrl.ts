export const formatUrl = (string: string, setUrl: Function) => {
  const link = string.split("'")[1];

  setUrl(link);
};
