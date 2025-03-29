
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import CropPlanning from '../components/CropPlanning';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeRainfallTracking from '../components/GuadeloupeRainfallTracking';
import usePageMetadata from '../hooks/use-page-metadata';
import { Button } from '@/components/ui/button';
import { Download, Filter, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CropsPage = () => {
  const { toast } = useToast();
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Cultures Guadeloupéennes',
    defaultDescription: 'Surveillez, planifiez et optimisez toutes vos cultures adaptées au climat tropical'
  });
  
  const [activeViewType, setActiveViewType] = useState<'all' | 'fruits' | 'vegetables' | 'cash'>('all');

  const handleExportData = () => {
    toast({
      title: "Export des données",
      description: "L'export de toutes les données des cultures a démarré"
    });
  };

  const handleShowHelp = () => {
    toast({
      title: "Aide disponible",
      description: "La documentation sur la gestion des cultures est accessible dans la section d'aide"
    });
  };

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <PageHeader 
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          
          <div className="flex space-x-2">
            <div className="relative">
              <select 
                className="h-10 appearance-none pl-3 pr-8 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                value={activeViewType}
                onChange={(e) => setActiveViewType(e.target.value as any)}
              >
                <option value="all">Toutes les cultures</option>
                <option value="fruits">Fruits tropicaux</option>
                <option value="vegetables">Légumes</option>
                <option value="cash">Cultures de rente</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            
            <Button variant="outline" onClick={handleShowHelp}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Aide
            </Button>
          </div>
        </div>

        <TabContainer tabs={tabs} defaultValue="crops" />
      </div>
    </PageLayout>
  );
};

export default CropsPage;
