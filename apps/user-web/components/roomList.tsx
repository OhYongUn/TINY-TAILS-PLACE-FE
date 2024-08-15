// RoomList.tsx
'use client';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { PawPrintIcon } from '@repo/ui/components/ui/icons';
import { useBookingStore } from '@app/store/bookingStore';

const RoomList = () => {
  const { availableRooms, openRoomDetails, hasSearched } = useBookingStore();

  return (
    <section className="py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {!hasSearched ? (
          <div className="text-center py-2">
            <p className="text-lg">객실을 검색해주세요.</p>
          </div>
        ) : availableRooms.length < 1 ? (
          <div className="text-center py-2">
            <p className="text-lg">예약 가능한 객실이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRooms.map((room) => (
              <Card key={room.id}>
                <img
                  src={room.imageUrls[0]}
                  alt={`${room.name} Image`}
                  className="rounded-t-lg object-cover w-full aspect-video"
                />
                <CardContent className="p-3">
                  <h3 className="text-lg font-bold mb-1">{room.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    <PawPrintIcon className="w-4 h-4 inline-block mr-1" />
                    최대 {room.capacity} 마리
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-semibold">
                      ${room.price.toLocaleString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openRoomDetails(room)}
                    >
                      상세보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomList;
