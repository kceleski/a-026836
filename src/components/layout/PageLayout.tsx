
import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';
import Navbar from '../Navbar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default PageLayout;
