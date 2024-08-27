export const paymentStatusMap: Record<string, string> = {
  PENDING: '결제 대기',
  COMPLETED: '결제 완료',
  FAILED: '결제 실패',
  REFUNDED: '환불 완료',
};

export const paymentMethodMap: Record<string, string> = {
  CREDIT_CARD: '신용 카드',
  BANK_TRANSFER: '계좌 이체',
  CASH: '현금 결제',
};
export const BookingStatusMap: Record<string, string> = {
  PENDING: 'PENDING',
  CONFIRMED: '예약 확정',
  CHECKED_IN: '입실 완료',
  CHECKED_OUT: '퇴실 완료',
  CANCELLED: '취소 완료',
};
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
  CONFIRMED = '예약 확정',
  CHECKED_IN = '입실 완료',
  CHECKED_OUT = '퇴실 완료',
  CANCELLED = '취소 완료',
}

export enum PaymentStatus {
  PENDING = '결제 대기',
  COMPLETED = '결제 완료',
  FAILED = '결제 실패',
  REFUNDED = '환불 완료',
}

export enum PaymentMethod {
  CREDIT_CARD = '신용 카드',
  BANK_TRANSFER = '계좌 이체',
  CASH = '현금 결제',
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
  phone: string;
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
    phone: string;
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
