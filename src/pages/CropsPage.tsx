
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import CropPlanning from '../components/CropPlanning';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeRainfallTracking from '../components/GuadeloupeRainfallTracking';
import usePageMetadata from '../hooks/use-page-metadata';

const CropsPage = () => {
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Cultures Guadeloupéennes',
    defaultDescription: 'Surveillez, planifiez et optimisez toutes vos cultures adaptées au climat tropical'
  });

  const tabs: TabItem[] = [
    {
      value: 'crops',
      label: 'Cultures',
      content: (
        <div className="space-y-6">
          <GuadeloupeSpecificCrops />
          <CropPlanning />
        </div>
      )
    },
    {
      value: 'harvest',
      label: 'Récoltes',
      content: <GuadeloupeHarvestTracking />
    },
    {
      value: 'rainfall',
      label: 'Précipitations',
      content: <GuadeloupeRainfallTracking />
    }
  ];

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <PageHeader 
          title={title}
          description={description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
        />

        <TabContainer tabs={tabs} defaultValue="crops" />
      </div>
    </PageLayout>
  );
};

export default CropsPage;
