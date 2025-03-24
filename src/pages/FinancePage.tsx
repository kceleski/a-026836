
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import FinancialTracking from '../components/FinancialTracking';

const FinancePage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <FinancialTracking />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default FinancePage;
