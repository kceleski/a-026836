
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import CropPlanning from '../components/CropPlanning';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import { Button } from '@/components/ui/button';
import { Download, Plus, Upload, Filter, RefreshCw, CalendarRange } from 'lucide-react';
import { StatisticsProvider } from '../contexts/StatisticsContext';
import { CRMProvider } from '../contexts/CRMContext';

const CropsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('harvest');

  // Actions based on the active tab
  const getTabActions = () => {
    switch (activeTab) {
      case 'harvest':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                console.log("Export des données de récolte");
              }}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                console.log("Synchronisation des données de récolte");
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Synchroniser
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                console.log("Filtres appliqués aux données de récolte");
              }}
            >
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
          </div>
        );
      case 'specific':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              className="flex items-center gap-2 bg-agri-primary hover:bg-agri-primary-dark"
              onClick={() => {
                console.log("Ajout de nouvelle culture");
              }}
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                console.log("Export des données des cultures");
              }}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        );
      case 'planning':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                console.log("Planification du calendrier des cultures");
              }}
            >
              <CalendarRange className="h-4 w-4" />
              Planifier
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                console.log("Ajout de nouvelle tâche culturale");
              }}
            >
              <Plus className="h-4 w-4" />
              Nouvelle tâche
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const tabLabels = {
      harvest: 'Suivi des Récoltes',
      specific: 'Cultures Spécifiques',
      planning: 'Planification'
    };
    
    const label = tabLabels[value as keyof typeof tabLabels] || value;
    console.log(`${label} activé - Affichage des données correspondantes`);
  };

  const tabs: TabItem[] = [
    {
      value: 'harvest',
      label: 'Suivi des Récoltes',
      content: <GuadeloupeHarvestTracking />
    },
    {
      value: 'specific',
      label: 'Cultures Spécifiques',
      content: <GuadeloupeSpecificCrops />
    },
    {
      value: 'planning',
      label: 'Planification',
      content: <CropPlanning />
    }
  ];

  return (
    <CRMProvider>
      <StatisticsProvider>
        <PageLayout>
          <div className="p-6 animate-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold">Gestion des Cultures</h1>
                <p className="text-muted-foreground">
                  Gérez vos cultures tropicales et suivez leur rendement
                </p>
              </div>
              {getTabActions()}
            </div>
            
            <TabContainer 
              tabs={tabs}
              defaultValue={activeTab}
              onValueChange={handleTabChange}
            />
          </div>
        </PageLayout>
      </StatisticsProvider>
    </CRMProvider>
  );
};

export default CropsPage;
