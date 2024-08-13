import React, { useState } from 'react';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Label } from '@repo/ui/components/ui/label';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useBookingStore } from '@app/store/bookingStore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/ui/alert-dialog';
import { usePayment } from '@app/hook/payment/paymentService';

interface FormData {
  petCount: string;
  requestedLateCheckout: boolean;
  requestedEarlyCheckin: boolean;
  specialRequests: string;
}

// 선택된 방 인터페이스
interface SelectedRoom {
  name: string;
  price: number;
}

// 날짜 범위 인터페이스
interface DateRange {
  from: Date | null;
  to: Date | null;
}

export const ReservationForm: React.FC = () => {
  const { showReservationForm, closeReservationForm, selectedRoom, dateRange } =
    useBookingStore();
  const { processPayment, isLoading, error } = usePayment();
  const [showPaymentAlert, setShowPaymentAlert] = useState<boolean>(false);
  const { control, handleSubmit, watch }: UseFormReturn<FormData> =
    useForm<FormData>({
      defaultValues: {
        petCount: '1',
        requestedLateCheckout: false,
        requestedEarlyCheckin: false,
        specialRequests: '',
      },
    });

  const watchLateCheckout = watch('requestedLateCheckout');
  const watchEarlyCheckin = watch('requestedEarlyCheckin');

  const basePrice = (selectedRoom as SelectedRoom)?.price ?? 0;

  const calculateAdditionalFees = (data: FormData): number => {
    let fees = 0;
    if (data.requestedLateCheckout) fees += basePrice * 0.5;
    if (data.requestedEarlyCheckin) fees += basePrice * 0.5;
    return fees;
  };

  const calculateTotalPrice = (data: FormData): number => {
    return basePrice + calculateAdditionalFees(data);
  };

  const handlePaymentClick = (data: FormData) => {
    setShowPaymentAlert(true);
  };

  const handlePaymentConfirm = async (data: FormData) => {
    setShowPaymentAlert(false);
    const totalPrice = calculateTotalPrice(data);
    const additionalFees = calculateAdditionalFees(data);
    const paymentData: PaymentData = {
      pg: 'inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: basePrice, // 선결제 금액 (기본 요금만)
      name: `${(selectedRoom as SelectedRoom).name} 예약`,
      buyer_email: 'buyer@example.com', // 실제 구매자 이메일로 대체해야 합니다
      buyer_name: '구매자명', // 실제 구매자 이름으로 대체해야 합니다
      buyer_tel: '010-1234-5678', // 실제 구매자 전화번호로 대체해야 합니다
    };

    try {
      const result = await processPayment(paymentData);
      console.log('결제 성공', result);
      // 여기에 결제 성공 후 처리 로직을 추가하세요 (예: 서버에 결제 정보 저장)
    } catch (err) {
      console.error('결제 실패', err);
      alert('결제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <Dialog open={showReservationForm} onOpenChange={closeReservationForm}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">예약하기</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handlePaymentClick)}>
            <Card className="border-none shadow-none">
              <CardContent className="space-y-4 p-0">
                <div>
                  <Label htmlFor="room-name" className="text-sm font-medium">
                    선택한 객실
                  </Label>
                  <Input
                    id="room-name"
                    value={selectedRoom?.name || ''}
                    readOnly
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="check-in" className="text-sm font-medium">
                    체크인 날짜
                  </Label>
                  <Input
                    id="check-in"
                    value={
                      dateRange?.from ? dateRange.from.toLocaleDateString() : ''
                    }
                    readOnly
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    기본 체크인 시간: 오후 4시
                  </p>
                </div>
                <div>
                  <Label htmlFor="check-out" className="text-sm font-medium">
                    체크아웃 날짜
                  </Label>
                  <Input
                    id="check-out"
                    value={
                      dateRange?.to ? dateRange.to.toLocaleDateString() : ''
                    }
                    readOnly
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    기본 체크아웃 시간: 오후 12시 (정오)
                  </p>
                </div>
                <div>
                  <Label htmlFor="pet-count" className="text-sm font-medium">
                    반려동물 수
                  </Label>
                  <Controller
                    name="petCount"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="반려동물 수 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}마리
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="requestedLateCheckout"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="requestedLateCheckout"
                          className="rounded-full"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="requestedLateCheckout" className="text-sm">
                      레이트 체크아웃 요청 (오후 6시까지)
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    추가 요금: 1박 가격의 50% (후불 결제)
                  </p>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="requestedEarlyCheckin"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="requestedEarlyCheckin"
                          className="rounded-full"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="requestedEarlyCheckin" className="text-sm">
                      얼리 체크인 요청 (오후 12시부터)
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    추가 요금: 1박 가격의 50% (후불 결제)
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    * 얼리 체크인 및 레이트 체크아웃은 객실 상태에 따라 가능
                    여부가 결정됩니다. 예약 시 요청하시면 체크인 당일 최종
                    안내해 드리겠습니다.
                  </p>
                </div>
                <div>
                  <Label
                    htmlFor="specialRequests"
                    className="text-sm font-medium"
                  >
                    요청사항
                  </Label>
                  <Controller
                    name="specialRequests"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="specialRequests"
                        placeholder="요청사항이 있다면 입력해주세요."
                        className="mt-1"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">요금 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>기본 요금:</span>
                      <span>{basePrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>추가 요금:</span>
                      <span>
                        {calculateAdditionalFees(watch()).toLocaleString()}원
                      </span>
                    </div>
                    {calculateAdditionalFees(watch()) > 0 && (
                      <div className="text-xs text-gray-500">
                        {watchLateCheckout && (
                          <p>
                            - 레이트 체크아웃:{' '}
                            {(basePrice * 0.5).toLocaleString()}원
                          </p>
                        )}
                        {watchEarlyCheckin && (
                          <p>
                            - 얼리 체크인: {(basePrice * 0.5).toLocaleString()}
                            원
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex justify-between font-bold">
                      <span>총 요금:</span>
                      <span>
                        {calculateTotalPrice(watch()).toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * 레이트 체크아웃 및 얼리 체크인 요금은 후불로 결제됩니다.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-0 pt-4">
                <Button type="submit" className="w-full">
                  결제 하기
                </Button>
              </CardFooter>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showPaymentAlert} onOpenChange={setShowPaymentAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>결제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              <p>실제 결제 금액: {basePrice.toLocaleString()}원</p>
              {calculateAdditionalFees(watch()) > 0 && (
                <p className="text-sm text-gray-500">
                  * 추가 요금{' '}
                  {calculateAdditionalFees(watch()).toLocaleString()}원은
                  체크아웃 시 현장에서 결제됩니다.
                </p>
              )}
              결제를 진행하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => handlePaymentConfirm(watch())}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {isLoading && <div>결제 처리 중...</div>}
      {error && <div>오류 발생: {error}</div>}
    </>
  );
};

export default ReservationForm;
