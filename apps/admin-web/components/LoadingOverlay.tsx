import React from 'react';
import { Loader2 } from '@repo/ui/components/ui/lucide-react';

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span className="text-lg font-semibold"></span>
      </div>
    </div>
  );
};
