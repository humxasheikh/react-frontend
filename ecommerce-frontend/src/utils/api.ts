import axios from 'axios';

const API_BASE = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: API_BASE,
});

export const fetchProducts = async (limit = 20, skip = 0) => {
  const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const fetchProductById = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
