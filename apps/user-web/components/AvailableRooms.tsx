import React from 'react';
import { Button } from '@repo/ui/components/ui/button';

interface Room {
  id: number;
  name: string;
  capacity: number;
  price: number;
}

interface AvailableRoomsProps {
  rooms: Room[];
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({ rooms }) => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-4">Available Rooms</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div key={room.id} className="border p-4 rounded-lg">
          <h4 className="font-medium">{room.name}</h4>
          <p>Capacity: {room.capacity} pets</p>
          <p>Price: ${room.price} per night</p>
          <Button className="mt-2 w-full">Select</Button>
        </div>
      ))}
    </div>
  </div>
);

export default AvailableRooms;
