import api from "./apis/auth.api";

const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export default fetcher;
