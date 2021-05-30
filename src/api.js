export const fetchAPI = (url, endpoint, params, options = {}) => {
  const baseURL = `${url}${endpoint}`;
  const uri = new URL(baseURL);

  Object.keys(params).forEach((key) =>
    uri.searchParams.append(key, params[key])
  );

  return new Promise((resolve, reject) => {
    fetch(uri, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};