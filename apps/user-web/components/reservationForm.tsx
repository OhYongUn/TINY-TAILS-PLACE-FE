import React, { useEffect, useState } from 'react';
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

export const ReservationForm = () => {
  const { showReservationForm, closeReservationForm, selectedRoom, dateRange } =
    useBookingStore();
  const [lateCheckout, setLateCheckout] = useState(false);
  const [earlyCheckin, setEarlyCheckin] = useState(false);
  const [additionalFees, setAdditionalFees] = useState(0);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  const basePrice = selectedRoom?.price ?? 0;
  const totalPrice = basePrice + additionalFees;

  useEffect(() => {
    let fees = 0;
    if (lateCheckout) fees += basePrice * 0.5;
    if (earlyCheckin) fees += basePrice * 0.5;
    setAdditionalFees(fees);
  }, [lateCheckout, earlyCheckin, basePrice]);

  const handlePaymentClick = () => {
    setShowPaymentAlert(true);
  };
  const handlePaymentConfirm = () => {
    setShowPaymentAlert(false);
    // 포트원 결제 모듈 초기화
    const { IMP } = window;
    IMP.init('your_imp_key'); // 실제 IMP 키로 대체해야 합니다

    IMP.request_pay(
      {
        pg: 'inicis',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: basePrice, // 선결제 금액 (기본 요금만)
        name: '객실 예약',
        buyer_email: 'buyer@example.com', // 실제 구매자 이메일로 대체해야 합니다
        buyer_name: '구매자명', // 실제 구매자 이름으로 대체해야 합니다
        buyer_tel: '010-1234-5678', // 실제 구매자 전화번호로 대체해야 합니다
      },
      (rsp: any) => {
        if (rsp.success) {
          // 결제 성공 시 로직
          console.log('결제 성공', rsp);
          // 여기에 결제 성공 후 처리 로직을 추가하세요 (예: 서버에 결제 정보 저장)
        } else {
          // 결제 실패 시 로직
          console.log('결제 실패', rsp);
          alert('결제에 실패했습니다. 다시 시도해 주세요.');
        }
      },
    );
  };
  return (
    <>
      <Dialog open={showReservationForm} onOpenChange={closeReservationForm}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">예약하기</DialogTitle>
          </DialogHeader>
          <Card className="border-none shadow-none">
            <CardContent className="space-y-4 p-0">
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
                  value={dateRange?.to ? dateRange.to.toLocaleDateString() : ''}
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
                <Select>
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
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requestedLateCheckout"
                    className="rounded-full"
                    checked={lateCheckout}
                    onCheckedChange={(checked) =>
                      setLateCheckout(checked as boolean)
                    }
                  />
                  <Label htmlFor="requestedLateCheckout" className="text-sm">
                    레이트 체크아웃 요청 (오후 6시까지)
                  </Label>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  추가 요금: 1박 가격의 50% (후불 결제)
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requestedEarlyCheckin"
                    className="rounded-full"
                    checked={earlyCheckin}
                    onCheckedChange={(checked) =>
                      setEarlyCheckin(checked as boolean)
                    }
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
                  여부가 결정됩니다. 예약 시 요청하시면 체크인 당일 최종 안내해
                  드리겠습니다.
                </p>
              </div>
              {/* ... (특별 요청사항 입력 부분) ... */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">요금 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>기본 요금:</span>
                    <span>{selectedRoom?.price.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>추가 요금:</span>
                    <span>{additionalFees.toLocaleString()}원</span>
                  </div>
                  {additionalFees > 0 && (
                    <div className="text-xs text-gray-500">
                      {lateCheckout && (
                        <p>
                          - 레이트 체크아웃:{' '}
                          {(basePrice * 0.5).toLocaleString()}원
                        </p>
                      )}
                      {earlyCheckin && (
                        <p>
                          - 얼리 체크인: {(basePrice * 0.5).toLocaleString()}원
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between font-bold">
                    <span>총 요금:</span>
                    <span>
                      <span>
                        {(basePrice + additionalFees).toLocaleString()}원
                      </span>
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 레이트 체크아웃 및 얼리 체크인 요금은 후불로 결제됩니다.
                </p>
              </div>
            </CardContent>
            <CardFooter className="px-0 pt-4">
              <Button onClick={handlePaymentClick} className="w-full">
                결제 하기
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showPaymentAlert} onOpenChange={setShowPaymentAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>결제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              <p>실제 결제 금액: {basePrice.toLocaleString()}원</p>
              {additionalFees > 0 && (
                <p className="text-sm text-gray-500">
                  * 추가 요금 {additionalFees.toLocaleString()}원은 체크아웃 시
                  현장에서 결제됩니다.
                </p>
              )}
              결제를 진행하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handlePaymentConfirm}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default ReservationForm;
