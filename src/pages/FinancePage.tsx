
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import FinancialTracking from '../components/FinancialTracking';

const FinancePage = () => {
  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <FinancialTracking />
      </div>
    </PageLayout>
  );
};

export default FinancePage;
