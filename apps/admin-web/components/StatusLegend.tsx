import React from 'react';

const statusColors = {
  available: 'bg-green-200',
  booked: 'bg-red-200',
  cleaning: 'bg-yellow-200',
  maintenance: 'bg-gray-200',
};

export function StatusLegend() {
  return (
    <div className="mt-4 flex space-x-4">
      {Object.entries(statusColors).map(([status, color]) => (
        <div key={status} className="flex items-center">
          <div className={`w-4 h-4 ${color} mr-2`}></div>
          <span className="text-sm">{status}</span>
        </div>
      ))}
    </div>
  );
}
