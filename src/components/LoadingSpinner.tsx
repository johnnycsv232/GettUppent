'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'white' | 'pink';
  text?: string;
  fullScreen?: boolean;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const colors = {
  gold: 'text-brand-gold',
  white: 'text-white',
  pink: 'text-brand-pink',
};

export default function LoadingSpinner({
  size = 'md',
  color = 'gold',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className={`${sizes[size]} ${colors[color]} animate-spin`} />
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#080808] flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
