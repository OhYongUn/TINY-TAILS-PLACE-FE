'use client';

import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { PawPrintIcon } from '@repo/ui/components/ui/icons';
import { useBookingStore } from '@app/store/bookingStore';
import { Room } from '@app/interface/rooms/roomType';

const RoomList = () => {
  const { availableRooms, openRoomDetails } = useBookingStore();

  if (availableRooms.length < 1) {
    return <p>No rooms available.</p>;
  }
  return (
    <section className="bg-muted py-8 px-4 md:px-6 flex-1">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.map((room) => (
            <Card key={room.id}>
              <img
                src={room.imageUrls[0]}
                alt={`${room.name} Image`}
                width={400}
                height={300}
                className="rounded-t-lg object-cover w-full aspect-video"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <Button
                    variant="outline"
                    onClick={() => openRoomDetails(room)}
                  >
                    상세보기
                  </Button>
                  {}
                </div>
                <div className="text-muted-foreground">
                  <PawPrintIcon className="w-4 h-4 inline-block mr-1" />
                  최대 {room.capacity} 마리
                </div>
                <div className="mt-2 text-right font-semibold">
                  총 가격 : ${room.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomList;
