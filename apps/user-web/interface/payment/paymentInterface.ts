export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
export interface CreateBookingDto {
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  roomDetailId: number;
  checkInDate: Date;
  checkOutDate: Date;
  requestedLateCheckout: boolean;
  requestedEarlyCheckin: boolean;
  petCount: number;
  basePrice: number;
  additionalFees: number;
  totalPrice: number;
  status: BookingStatus;
  request?: string;
}
export interface InitiateBookingResponseDto {
  bookingId: string;
  paymentId: string;
  amount: number;
}

export interface ConfirmBookingResponseDto {
  bookingId: string;
  paymentId: string;
}
