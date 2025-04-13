
import React, { useState, useRef } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import Inventory from '../components/Inventory';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import { Button } from '../components/ui/button';
import { Download, Plus, Upload, FileUp, FileDown, BarChart2, Calendar, Package } from 'lucide-react';
import { DatePickerWithRange } from '../components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';
import usePageMetadata from '../hooks/use-page-metadata';
import { downloadInventoryTemplate } from '../components/inventory/ImportExportFunctions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const InventoryPage = () => {
  const { toast: shadowToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('inventory');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  
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
                      
    toast.info(`Fonctionnalité d'ajout de ${actionText} activée`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Pass the search term to the active component using context or props
  };

  const handleDownloadTemplate = () => {
    downloadInventoryTemplate();
  };

  const renderTabActions = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="whitespace-nowrap">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportData}>
              <FileDown className="mr-2 h-4 w-4" />
              Exporter CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportData}>
              <BarChart2 className="mr-2 h-4 w-4" />
              Exporter PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="whitespace-nowrap">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleImportClick}>
              <FileUp className="mr-2 h-4 w-4" />
              Importer un fichier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDownloadTemplate}>
              <Package className="mr-2 h-4 w-4" />
              Télécharger modèle
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".csv"
          className="hidden" 
        />
        
        <Button onClick={handleAddItem} className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          {activeTab === 'inventory' ? 'Ajouter un stock' : 
           activeTab === 'crops' ? 'Ajouter une culture' : 
           activeTab === 'weather' ? 'Ajouter une alerte' : 'Ajouter'}
        </Button>
      </div>
    );
  };

  const renderFilterArea = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-3 w-full"
      >
        <div className="relative flex-grow">
          <Input 
            placeholder={`Rechercher dans ${activeTab === 'inventory' ? 'l\'inventaire' : activeTab === 'crops' ? 'les cultures' : 'les alertes'}`} 
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="w-full md:w-[300px]">
          <DatePickerWithRange
            date={dateRange}
            setDate={setDateRange}
            placeholderText="Filtrer par date"
            align="end"
          />
        </div>
      </motion.div>
    );
  };

  const tabs: TabItem[] = [
    {
      value: 'inventory',
      label: 'Inventaire',
      content: <Inventory dateRange={dateRange} searchTerm={searchTerm} />
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
    
    toast.info(`Vous consultez maintenant ${tabLabels[value as keyof typeof tabLabels] || value}`);
  };

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <PageHeader 
          title={title}
          description={description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          actions={renderTabActions()}
          icon={<Package className="h-6 w-6" />}
          filterArea={renderFilterArea()}
        />

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
