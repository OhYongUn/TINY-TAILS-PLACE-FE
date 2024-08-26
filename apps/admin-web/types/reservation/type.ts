export type RoomStatus = 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | string;

export interface RoomStatusDto {
  date: string;
  status: string;
}

export interface Room {
  id: number;
  roomNumber: string;
  name: string;
  bookingId: string;
  status: RoomStatusDto[];
}

export interface ReservationsResponseDto {
  success: boolean;
  statusCode: number;
  data: {
    year: number;
    month: number;
    rooms: Room[];
  };
  error: string | null;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
}

export enum PaymentType {
  DEPOSIT = 'DEPOSIT',
  FULL_PAYMENT = 'FULL_PAYMENT',
  ADDITIONAL_CHARGE = 'ADDITIONAL_CHARGE',
}

export enum FeeType {
  LATE_CHECK_OUT = 'LATE_CHECK_OUT',
  EARLY_CHECK_IN = 'EARLY_CHECK_IN',
  EXTRA_BED = 'EXTRA_BED',
  PET_FEE = 'PET_FEE',
  OTHER = 'OTHER',
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export interface BookingDetailsDto {
  petCount: number;
  request: string | null;
  requestedLateCheckout: boolean;
  requestedEarlyCheckin: boolean;
  actualLateCheckout: boolean;
  actualEarlyCheckin: boolean;
}

export interface StatusHistoryDto {
  status: BookingStatus;
  reason: string | null;
  createdAt: string;
}

export interface PaymentDto {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  type: PaymentType;
  transactionId: string | null;
  createdAt: string;
}

export interface AdditionalFeeDto {
  feeType: FeeType;
  amount: number;
  description: string | null;
  createdAt: string;
}

export interface ReservationDetailDto {
  id: string;
  userId: number;
  roomNumber: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  basePrice: number;
  totalPrice: number;
  status: string;
  cancellationDate: string | null;
  cancellationFee: number | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  bookingDetails: {
    petCount: number;
    request: string | null;
    requestedLateCheckout: boolean;
    requestedEarlyCheckin: boolean;
    actualLateCheckout: boolean;
    actualEarlyCheckin: boolean;
  } | null;
  statusHistories: Array<{
    status: string;
    reason: string | null;
    createdAt: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    method: string;
    type: string;
    transactionId: string | null;
    createdAt: string;
  }>;
  additionalFees: Array<{
    feeType: string;
    amount: number;
    description: string | null;
    createdAt: string;
  }>;
}

export interface ReservationDetailResponseDto {
  success: boolean;
  statusCode: number;
  data: ReservationDetailDto | null;
  error: string | null;
}
