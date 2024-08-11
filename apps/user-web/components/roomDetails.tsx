'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { useBookingStore } from '@app/store/bookingStore';

const RoomDetails = () => {
  const {
    selectedRoom,
    showRoomDetails,
    closeRoomDetails,
    openReservationForm,
  } = useBookingStore();

  if (!selectedRoom) return null;
  const handleBookNow = () => {
    closeRoomDetails();
    openReservationForm();
  };
  return (
    <Dialog open={showRoomDetails} onOpenChange={closeRoomDetails}>
      <DialogContent className="sm:max-w-[800px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={selectedRoom.imageUrls[0] || '/placeholder.svg'}
              alt={`${selectedRoom.name} 이미지`}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full aspect-video"
            />
          </div>
          <div>
            <DialogHeader>
              <DialogTitle>{selectedRoom.name}</DialogTitle>
              <DialogDescription>{selectedRoom.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">객실 정보</h3>
                <ul className="list-disc pl-4 text-muted-foreground">
                  <li>넓이: {selectedRoom.size}㎡</li>
                  <li>최대 수용 가능 반려동물: {selectedRoom.capacity}마리</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">총 가격</h3>
                <p className="text-2xl font-bold">
                  {selectedRoom.price.toLocaleString()}원
                </p>
              </div>
              <DialogFooter>
                <Button onClick={closeRoomDetails}>닫기</Button>
                <Button onClick={handleBookNow}>예약하기</Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetails;
