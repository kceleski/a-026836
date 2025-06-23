
import React, { ReactNode } from 'react';
import Navbar from '../Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-care-surface">
      <Navbar />
      <div className="flex-1 overflow-y-auto care-scrollbar pb-16 md:pb-0">
        <div className={`container mx-auto px-3 py-6 md:px-6 ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
          <div className="min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
