import React from 'react';

interface Props {
  text?: string;
}

export function LoadingSpinner({ text = 'Chargement...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[150px]">
      {/* Blue rotating circle */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-600 text-sm">{text}</p>
    </div>
  );
}
