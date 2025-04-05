
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PlusCircle, Download, Filter, RefreshCw } from 'lucide-react';
import { StatisticsProvider } from '../contexts/StatisticsContext';
import { CRMProvider } from '../contexts/CRMContext';

const CropsPage = () => {
  const { toast: shadowToast } = useToast();
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
                toast.success("Export des données", {
                  description: "Les données de récolte ont été exportées"
                });
              }}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                toast.success("Synchronisation", {
                  description: "Les données ont été synchronisées"
                });
              }}
            >
              <RefreshCw className="h-4 w-4" />
              Synchroniser
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                toast.success("Filtres appliqués", {
                  description: "Les données ont été filtrées"
                });
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
                toast.success("Ajout de culture", {
                  description: "Vous pouvez maintenant ajouter une nouvelle culture"
                });
              }}
            >
              <PlusCircle className="h-4 w-4" />
              Ajouter
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                toast.success("Export des données", {
                  description: "Les données des cultures ont été exportées"
                });
              }}
            >
              <Download className="h-4 w-4" />
              Exporter
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
      specific: 'Cultures Spécifiques'
    };
    
    const label = tabLabels[value as keyof typeof tabLabels] || value;
    
    // Use both toast systems for better user experience
    shadowToast({
      title: `${label} activé`,
      description: `Vous consultez maintenant les données de ${label.toLowerCase()}`
    });
    
    toast.success(`${label} activé`);
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
