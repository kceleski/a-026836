
import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Navbar from '../Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className={`container mx-auto px-3 py-4 md:px-6 ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
          {children}
        </div>
      </div>
      <Toaster 
        position={isMobile ? "bottom-center" : "top-right"}
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: isMobile ? '0.75rem' : '1rem',
            maxWidth: isMobile ? '90%' : 'auto',
          },
          className: 'md:min-w-[300px]'
        }} 
      />
    </div>
  );
};

export default PageLayout;
