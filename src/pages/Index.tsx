
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Dashboard from '../components/Dashboard';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import TaskList from '../components/cultures/TaskList';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PlusCircle, Download, Filter, RefreshCw, Upload, Printer } from 'lucide-react';
import { StatisticsProvider } from '../contexts/StatisticsContext';
import { useCRM } from '../contexts/CRMContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Index = () => {
  const { toast: shadowToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userName, setUserName] = useState('Exploitant');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Utiliser le contexte CRM
  const { 
    lastSync,
    isRefreshing,
    syncDataAcrossCRM,
    exportModuleData,
    importModuleData,
    printModuleData
  } = useCRM();

  // Actions based on the active tab
  const getTabActions = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={syncDataAcrossCRM}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Synchroniser
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleExportData('dashboard')}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleImportData()}
            >
              <Upload className="h-4 w-4" />
              Importer
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handlePrintData('dashboard')}
            >
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
          </div>
        );
      case 'harvest':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleExportData('harvest')}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handlePrintData('harvest')}
            >
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
          </div>
        );
      case 'weather':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleExportData('weather')}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => toast.info('Configuration des alertes météo')}
            >
              <Filter className="h-4 w-4" />
              Configurer
            </Button>
          </div>
        );
      case 'tasks':
        return (
          <div className="flex flex-wrap gap-2">
            <Button 
              className="flex items-center gap-2 bg-agri-primary hover:bg-agri-primary-dark"
              onClick={() => toast.success('Nouvelle tâche ajoutée')}
            >
              <PlusCircle className="h-4 w-4" />
              Ajouter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleExportData('tasks')}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handlePrintData('tasks')}
            >
              <Printer className="h-4 w-4" />
              Imprimer
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
      dashboard: 'Tableau de Bord',
      harvest: 'Suivi des Récoltes',
      weather: 'Alertes Météo',
      tasks: 'Tâches'
    };
    
    const label = tabLabels[value as keyof typeof tabLabels] || value;
    
    // Use both toast systems for better user experience
    shadowToast({
      title: `${label} activé`,
      description: `Vous consultez maintenant les données de ${label.toLowerCase()}`
    });
    
    toast.success(`${label} activé`);
  };

  // Manipulations des données
  const handleExportData = async (tab: string) => {
    const moduleMapping: {[key: string]: string} = {
      'dashboard': 'statistiques',
      'harvest': 'cultures',
      'weather': 'statistiques',
      'tasks': 'cultures'
    };
    
    const module = moduleMapping[tab] || 'statistiques';
    
    toast.info(`Export ${tab} en cours...`);
    
    const format = tab === 'dashboard' ? 'excel' : 'csv';
    
    const success = await exportModuleData(module, format as 'csv' | 'excel' | 'pdf');
    
    if (success) {
      shadowToast({
        title: "Données exportées",
        description: `Les données de ${tab} ont été exportées avec succès`
      });
    }
  };

  const handleImportData = () => {
    setImportDialogOpen(true);
  };

  const handleImportConfirm = async () => {
    if (!selectedFile) {
      toast.error("Aucun fichier sélectionné");
      return;
    }
    
    const moduleMapping = {
      'dashboard': 'statistiques',
      'harvest': 'cultures',
      'weather': 'statistiques',
      'tasks': 'cultures'
    };
    
    const module = moduleMapping[activeTab] || 'statistiques';
    
    toast.info(`Import ${selectedFile.name} en cours...`);
    
    const success = await importModuleData(module, selectedFile);
    
    if (success) {
      shadowToast({
        title: "Données importées",
        description: `Les données ont été importées avec succès`
      });
    }
    
    setImportDialogOpen(false);
    setSelectedFile(null);
  };

  const handlePrintData = async (tab: string) => {
    const moduleMapping = {
      'dashboard': 'statistiques',
      'harvest': 'cultures',
      'weather': 'statistiques',
      'tasks': 'cultures'
    };
    
    const module = moduleMapping[tab] || 'statistiques';
    
    toast.info(`Préparation de l'impression...`);
    
    const success = await printModuleData(module);
    
    if (success) {
      shadowToast({
        title: "Impression préparée",
        description: `Le document est prêt à être imprimé`
      });
    }
  };

  const tabs: TabItem[] = [
    {
      value: 'dashboard',
      label: 'Tableau de Bord',
      content: <Dashboard />
    },
    {
      value: 'harvest',
      label: 'Suivi des Récoltes',
      content: <GuadeloupeHarvestTracking />
    },
    {
      value: 'weather',
      label: 'Alertes Météo',
      content: <GuadeloupeWeatherAlerts />
    },
    {
      value: 'tasks',
      label: 'Tâches',
      content: <TaskList />
    }
  ];

  return (
    <StatisticsProvider>
      <PageLayout>
        <div className="p-6 animate-enter">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Tableau de Bord Agri Dom</h1>
              <p className="text-muted-foreground">
                Bienvenue, {userName} | Dernière synchronisation: {lastSync.toLocaleTimeString()}
              </p>
            </div>
            {getTabActions()}
          </div>
          
          <TabContainer 
            tabs={tabs}
            defaultValue={activeTab}
            onValueChange={handleTabChange}
          />
          
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importer des données</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Fichier CSV</Label>
                  <input 
                    type="file" 
                    id="file" 
                    accept=".csv" 
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Les données seront importées dans le module courant. 
                  Assurez-vous que le fichier est au format CSV.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setImportDialogOpen(false)}>Annuler</Button>
                <Button onClick={handleImportConfirm}>Importer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PageLayout>
    </StatisticsProvider>
  );
};

export default Index;
