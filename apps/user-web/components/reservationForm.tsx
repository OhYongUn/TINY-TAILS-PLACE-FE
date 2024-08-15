import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
import { usePayment } from '@app/hook/payment/paymentService';
import PaymentConfirmation from '@app/components/paymentConfirmation';

interface FormData {
  roomId: number;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  petCount: string;
  requestedLateCheckout: boolean;
  requestedEarlyCheckin: boolean;
  specialRequests: string;
}

const ReservationForm = () => {
  const { showReservationForm, closeReservationForm, selectedRoom, dateRange } =
    useBookingStore();
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const { processPayment, isLoading, error } = usePayment();

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      roomId: selectedRoom?.id,
      roomName: selectedRoom?.name || '',
      checkInDate: dateRange?.from ? dateRange.from.toISOString() : '',
      checkOutDate: dateRange?.to ? dateRange.to.toISOString() : '',
      petCount: '1',
      requestedLateCheckout: false,
      requestedEarlyCheckin: false,
      specialRequests: '',
    },
  });

  const watchLateCheckout = watch('requestedLateCheckout');
  const watchEarlyCheckin = watch('requestedEarlyCheckin');

  const basePrice = selectedRoom?.price ?? 0;

  const calculateAdditionalFees = (data: FormData): number => {
    let fees = 0;
    if (data.requestedLateCheckout) fees += basePrice * 0.5;
    if (data.requestedEarlyCheckin) fees += basePrice * 0.5;
    return fees;
  };

  const calculateTotalPrice = (data: FormData): number => {
    return basePrice + calculateAdditionalFees(data);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setShowPaymentConfirmation(true);
  };

  return (
    <>
      <Dialog open={showReservationForm} onOpenChange={closeReservationForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">예약하기</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="border-none shadow-none">
              <CardContent className="space-y-4 p-0">
                <div>
                  <Label htmlFor="roomName" className="text-sm font-medium">
                    선택한 객실
                  </Label>
                  <Controller
                    name="roomName"
                    control={control}
                    render={({ field }) => <Input {...field} readOnly />}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="checkInDate"
                      className="text-sm font-medium"
                    >
                      체크인 날짜
                    </Label>
                    <Controller
                      name="checkInDate"
                      control={control}
                      render={({ field }) => <Input {...field} readOnly />}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      기본 체크인 시간: 오후 4시
                    </p>
                  </div>
                  <div>
                    <Label
                      htmlFor="checkOutDate"
                      className="text-sm font-medium"
                    >
                      체크아웃 날짜
                    </Label>
                    <Controller
                      name="checkOutDate"
                      control={control}
                      render={({ field }) => <Input {...field} readOnly />}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      기본 체크아웃 시간: 오후 12시 (정오)
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="petCount" className="text-sm font-medium">
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
              </CardContent>
              <CardFooter className="px-0 pt-4">
                <Button type="submit" className="w-full">
                  결제 하기
                </Button>
              </CardFooter>
            </Card>
          </form>
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
                      - 레이트 체크아웃: {(basePrice * 0.5).toLocaleString()}원
                    </p>
                  )}
                  {watchEarlyCheckin && (
                    <p>- 얼리 체크인: {(basePrice * 0.5).toLocaleString()}원</p>
                  )}
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>총 요금:</span>
                <span>{calculateTotalPrice(watch()).toLocaleString()}원</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * 레이트 체크아웃 및 얼리 체크인 요금은 후불로 결제됩니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      {showPaymentConfirmation && (
        <PaymentConfirmation
          formData={watch()}
          basePrice={basePrice}
          additionalFees={calculateAdditionalFees(watch())}
          onClose={() => setShowPaymentConfirmation(false)}
        />
      )}
      {isLoading && <div>결제 처리 중...</div>}
      {error && <div>오류 발생: {error}</div>}
    </>
  );
};

export default ReservationForm;
