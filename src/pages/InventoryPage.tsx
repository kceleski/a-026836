
import React, { useState } from 'react';
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
import usePageMetadata from '../hooks/use-page-metadata';

const InventoryPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('inventory');
  
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
    toast({
      title: "Export réussi",
      description: `Les données de ${activeTab === 'inventory' ? 'l\'inventaire' : 
                      activeTab === 'crops' ? 'cultures' : 'météo'} ont été exportées en CSV`
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import de données",
      description: `Veuillez sélectionner un fichier CSV à importer pour ${
        activeTab === 'inventory' ? 'l\'inventaire' : 
        activeTab === 'crops' ? 'les cultures' : 'les alertes météo'}`
    });
  };

  const handleAddItem = () => {
    const actionText = activeTab === 'inventory' ? 'stock' : 
                      activeTab === 'crops' ? 'culture' : 
                      activeTab === 'weather' ? 'alerte' : 'élément';
                      
    toast({
      title: `Ajout de ${actionText}`,
      description: `Fonctionnalité d'ajout de ${actionText} activée`
    });
  };

  const renderTabActions = () => {
    return (
      <div className="flex space-x-2">
        <Button variant="outline" onClick={handleExportData}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
        <Button variant="outline" onClick={handleImportData}>
          <Upload className="mr-2 h-4 w-4" />
          Importer
        </Button>
        <Button onClick={handleAddItem}>
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
      title: "Changement d'onglet",
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
          defaultValue="inventory" 
          onValueChange={handleTabChange} 
        />
      </div>
    </PageLayout>
  );
};

export default InventoryPage;
