'use server';

import api from '@app/utils/api';
import { Department } from '@app/types/admins/type';

export const getDepartments = async () => {
  try {
    const response = await api.get(`/admins/departments`);
    console.log('response=>>>', response.data);
    return response.data.data.list;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw new Error('Failed to fetch departments');
  }
};
