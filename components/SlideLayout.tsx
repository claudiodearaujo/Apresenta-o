import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  className?: string;
  isCover?: boolean;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ children, className = '', isCover = false }) => {
  return (
    <div 
      className={`h-full w-full flex flex-col p-8 md:p-12 lg:p-16 transition-all duration-500 ${
        isCover 
          ? 'bg-gradient-to-br from-daycoval-blue to-slate-900 text-white justify-center items-center text-center' 
          : 'bg-white text-slate-800'
      } ${className}`}
    >
      {children}
    </div>
  );
};