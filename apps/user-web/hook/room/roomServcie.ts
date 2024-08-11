import { useState } from 'react';
import { Room } from '@app/interface/rooms/roomType';
import { apiRequest, useApiData } from '@app/interface/ApiResponse';

export function useRoomSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (params: {
    checkIn: string;
    checkOut: string;
  }): Promise<Room[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest<Room[]>(
        '/api/rooms/search',
        'GET',
        undefined,
        { params },
      );

      const { data, error } = useApiData(response);

      if (error) {
        setError(error.message);
        return [];
      }

      return data || [];
    } catch (err) {
      setError('An error occurred while searching for rooms.');
      console.error('Error fetching available rooms:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, performSearch };
}
