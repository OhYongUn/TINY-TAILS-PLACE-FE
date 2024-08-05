import { useState } from 'react';
import axios from 'axios';
import {
  SearchRoomParams,
  Room,
  SearchRoomResponse,
} from '@app/interface/rooms/roomType';
import { isApiSuccessResponse } from '@app/interface/ApiResponse';

export function useRoomSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  const performSearch = async (params: SearchRoomParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<SearchRoomResponse>(
        '/api/rooms/search',
        { params },
      );
      console.log('responseresponse', response);
      if (isApiSuccessResponse(response.data)) {
        setAvailableRooms(response.data.data);
      } else {
        setError(response.data.message);
        setAvailableRooms([]);
      }
    } catch (err) {
      setError('An error occurred while searching for rooms.');
      console.error('Error fetching available rooms:', err);
      setAvailableRooms([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, availableRooms, performSearch };
}
