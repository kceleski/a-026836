
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import Inventory from '../components/Inventory';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import usePageMetadata from '../hooks/use-page-metadata';

const InventoryPage = () => {
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Stocks et Récoltes',
    defaultDescription: 'Gérez votre inventaire et suivez les niveaux de stock de vos cultures guadeloupéennes'
  });

  const tabs: TabItem[] = [
    {
      value: 'inventory',
      label: 'Inventaire',
      content: <Inventory />
    },
    {
      value: 'crops',
      label: 'Cultures',
      content: (
        <>
          <GuadeloupeSpecificCrops />
          <GuadeloupeHarvestTracking />
        </>
      )
    },
    {
      value: 'weather',
      label: 'Météo',
      content: <GuadeloupeWeatherAlerts />
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

        <TabContainer tabs={tabs} defaultValue="inventory" />
      </div>
    </PageLayout>
  );
};

export default InventoryPage;
