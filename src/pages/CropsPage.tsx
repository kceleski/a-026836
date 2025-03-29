
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import CropPlanning from '../components/CropPlanning';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeRainfallTracking from '../components/GuadeloupeRainfallTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import usePageMetadata from '../hooks/use-page-metadata';
import { Button } from '@/components/ui/button';
import { Download, Filter, HelpCircle, Upload, CloudLightning } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleImportData = () => {
    toast({
      title: "Import de données",
      description: "Veuillez sélectionner un fichier à importer"
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
    },
    {
      value: 'weather',
      label: 'Alertes Météo',
      content: <GuadeloupeWeatherAlerts />
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
          
          <div className="flex flex-wrap gap-2">
            <Select 
              value={activeViewType} 
              onValueChange={(value) => setActiveViewType(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Toutes les cultures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les cultures</SelectItem>
                <SelectItem value="fruits">Fruits tropicaux</SelectItem>
                <SelectItem value="vegetables">Légumes</SelectItem>
                <SelectItem value="cash">Cultures de rente</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
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
