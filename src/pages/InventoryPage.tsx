
import React, { useState, useRef } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import Inventory from '../components/Inventory';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import { Button } from '../components/ui/button';
import { Download, Plus, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';
import usePageMetadata from '../hooks/use-page-metadata';

const InventoryPage = () => {
  const { toast: shadowToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('inventory');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Stocks et Récoltes',
    defaultDescription: 'Gérez votre inventaire et suivez les niveaux de stock de vos cultures guadeloupéennes'
  });

  const handleExportData = () => {
    if (activeTab === 'inventory') {
      // The actual export is handled in the Inventory component
      toast.success("Export des données d'inventaire lancé");
    } else if (activeTab === 'crops') {
      toast.info("Export des données de cultures");
      shadowToast({
        description: "L'export des cultures sera disponible prochainement"
      });
    } else if (activeTab === 'weather') {
      toast.info("Export des données météo");
      shadowToast({
        description: "L'export des données météo sera disponible prochainement"
      });
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.info(`Importation du fichier ${file.name}`);
    
    // The actual import is handled in the Inventory component
    // This is just a placeholder for the top-level action
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddItem = () => {
    const actionText = activeTab === 'inventory' ? 'stock' : 
                      activeTab === 'crops' ? 'culture' : 
                      activeTab === 'weather' ? 'alerte' : 'élément';
                      
    toast({
      description: `Fonctionnalité d'ajout de ${actionText} activée`
    });
  };

  const renderTabActions = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleExportData} className="whitespace-nowrap">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
        <div className="relative">
          <Button variant="outline" onClick={handleImportClick} className="whitespace-nowrap">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv"
            className="hidden" 
          />
        </div>
        <Button onClick={handleAddItem} className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          {activeTab === 'inventory' ? 'Ajouter un stock' : 
           activeTab === 'crops' ? 'Ajouter une culture' : 
           activeTab === 'weather' ? 'Ajouter une alerte' : 'Ajouter'}
        </Button>
      </div>
    );
  };

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
        <div className="space-y-8">
          <GuadeloupeSpecificCrops />
          <GuadeloupeHarvestTracking />
        </div>
      )
    },
    {
      value: 'weather',
      label: 'Météo',
      content: <GuadeloupeWeatherAlerts />
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const tabLabels = {
      inventory: 'l\'Inventaire',
      crops: 'les Cultures',
      weather: 'les Alertes Météo'
    };
    
    toast({
      description: `Vous consultez maintenant ${tabLabels[value as keyof typeof tabLabels] || value}`
    });
  };

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <PageHeader 
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          {renderTabActions()}
        </div>

        <TabContainer 
          tabs={tabs} 
          defaultValue={activeTab} 
          onValueChange={handleTabChange} 
        />
      </div>
    </PageLayout>
  );
};

export default InventoryPage;
