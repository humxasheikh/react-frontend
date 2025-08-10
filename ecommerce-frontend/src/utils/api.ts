import axios from 'axios';
import type { Product } from '../types/Products';

const API_BASE = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: API_BASE,
});

export const fetchProductsAPI = async (
  limit: number,
  skip: number
): Promise<{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}> => {
  const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const fetchProductById = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
