'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-brand-gold text-black hover:shadow-[0_0_30px_rgba(217,174,67,0.4)] hover:scale-[1.02]',
  secondary: 'bg-brand-pink text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-[1.02]',
  outline: 'border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40',
  ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, href, children, className = '', disabled, ...props }, ref) => {
    const baseClasses = `
      relative inline-flex items-center justify-center gap-2
      font-bold uppercase tracking-wider
      transition-all duration-300 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `;

    const content = (
      <>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
