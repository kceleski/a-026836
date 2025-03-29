
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import FinancialTracking from '../components/FinancialTracking';
import { Toaster } from "../components/ui/toaster";
import PageHeader from '../components/layout/PageHeader';
import usePageMetadata from '../hooks/use-page-metadata';

const FinancePage = () => {
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion Financière',
    defaultDescription: 'Suivez vos revenus, dépenses et la rentabilité de votre exploitation agricole'
  });

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <PageHeader 
          title={title}
          description={description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
        />
        <FinancialTracking />
        <Toaster />
      </div>
    </PageLayout>
  );
};

export default FinancePage;
