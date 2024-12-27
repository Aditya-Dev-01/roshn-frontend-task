import axios from 'axios';
import { User } from '../types/user';
import { API_BASE_URL,MAX_RETRIES,ITEMS_PER_PAGE ,RETRY_DELAY} from '../utils/constants';

export const fetchUsers = async (page: number = 1) => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const paginatedUsers = response.data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      return {
        users: paginatedUsers,
        totalPages: Math.ceil(response.data.length / ITEMS_PER_PAGE)
      };
    } catch (error) {
      retries++;
      if (retries === MAX_RETRIES) {
        throw new Error('Failed to fetch users after 3 attempts');
      }
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

export const fetchUserById = async (id: number) => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      retries++;
      if (retries === MAX_RETRIES) {
        throw new Error('Failed to fetch user details after 3 attempts');
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};