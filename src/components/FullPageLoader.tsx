import React from 'react';

interface Props {
  text?: string;
}

export function FullPageLoader({ text = "Chargement… Veuillez patienter" }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Blue spinning circle */}
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-700 text-lg text-center">{text}</p>
    </div>
  );
}
