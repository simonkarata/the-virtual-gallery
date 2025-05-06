'use client';

import React from 'react';

type Props = {
  modelPath: string;
};

export default function UserControl({ modelPath }: Props) {
  if (!modelPath) {
    console.warn('UserControl: modelPath is missing');
    return null;
  }

  return (
    <div className="bg-black/60 text-white px-4 py-2 rounded-md shadow-lg pointer-events-auto max-w-xs text-center">
      <p className="text-sm">
        Use <span className="font-medium">mouse</span> or <span className="font-medium">touch</span> to rotate, zoom, and pan the model.
      </p>
    </div>
  );
}
