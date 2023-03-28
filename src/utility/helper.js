export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getTime = (timestamp) => {
  let dateformat = Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
  }).format(timestamp);
  return dateformat;
};

export const getFullTime = (timestamp) => {
  let dateformat = Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);
  return dateformat;
};

export const getDate = (timestamp) => {
  let dateformat = Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(timestamp);
  return dateformat;
};

export const getQueryString = (queries) => {
  return Object.keys(queries)
    .reduce((result, key) => {
      return [
        ...result,
        `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
      ];
    }, [])
    .join("&");
};

export const fetchFromAPI = async (
  resourceURL = "",
  queryObject = {},
  baseURL = process.env.REACT_APP_API_BASE_URL
) => {
  return await fetch(
    `${baseURL}${resourceURL}?${getQueryString(queryObject)}`
  ).then((res) => res.json());
};
