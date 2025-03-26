
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import FinancialTracking from '../components/FinancialTracking';
import { Toaster } from "../components/ui/toaster";

const FinancePage = () => {
  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <FinancialTracking />
        <Toaster />
      </div>
    </PageLayout>
  );
};

export default FinancePage;
