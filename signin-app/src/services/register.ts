import axio from 'axios';
import axios from 'axios';
import { URL } from './consts';

export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axio.post(`${URL}/users/singup`, {
      name: fullName,
      email,
      password,
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e;
    } else {
      console.error(e);
      throw new Error('An unexpected error occurred');
    }
  }
};
