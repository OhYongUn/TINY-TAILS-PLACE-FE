import create from 'zustand';
import { Room } from '@app/interface/rooms/roomType';
import { DateRange } from 'react-day-picker';

interface BookingState {
  availableRooms: Room[];
  selectedRoom: Room | null;
  showRoomDetails: boolean;
  showReservationForm: boolean;
  dateRange: DateRange | undefined;
  hasSearched: boolean;
  setAvailableRooms: (rooms: Room[]) => void;
  setSelectedRoom: (room: Room | null) => void;
  openRoomDetails: (room: Room) => void;
  closeRoomDetails: () => void;
  openReservationForm: () => void;
  closeReservationForm: () => void;
  setDateRange: (range: DateRange | undefined) => void;
  setHasSearched: (value: boolean) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  availableRooms: [],
  selectedRoom: null,
  showRoomDetails: false,
  showReservationForm: false,
  dateRange: undefined,
  hasSearched: false,
  setAvailableRooms: (rooms) =>
    set({ availableRooms: rooms, hasSearched: true }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  openRoomDetails: (room) => set({ selectedRoom: room, showRoomDetails: true }),
  closeRoomDetails: () => set({ showRoomDetails: false }),
  openReservationForm: () => set({ showReservationForm: true }),
  closeReservationForm: () => set({ showReservationForm: false }),
  setDateRange: (range) => set({ dateRange: range }),
  setHasSearched: (value) => set({ hasSearched: value }),
}));
