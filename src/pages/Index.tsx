
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Dashboard from '../components/Dashboard';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import TaskList from '../components/cultures/TaskList';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PlusCircle, Download, Filter, RefreshCw } from 'lucide-react';

const Index = () => {
  const { toast: shadowToast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Actions based on the active tab
  const getTabActions = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              setIsRefreshing(true);
              toast.info('Actualisation des données en cours...');
              
              // Simulate refresh
              setTimeout(() => {
                setIsRefreshing(false);
                toast.success('Données actualisées avec succès');
              }, 1500);
            }}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        );
      case 'harvest':
        return (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.success('Rapport de récolte téléchargé')}
          >
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        );
      case 'weather':
        return (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.info('Configuration des alertes météo')}
          >
            <Filter className="h-4 w-4" />
            Configurer
          </Button>
        );
      case 'tasks':
        return (
          <Button 
            className="flex items-center gap-2 bg-agri-primary hover:bg-agri-primary-dark"
            onClick={() => toast.success('Nouvelle tâche ajoutée')}
          >
            <PlusCircle className="h-4 w-4" />
            Ajouter
          </Button>
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
    <PageLayout>
      <div className="p-6 animate-enter">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Tableau de Bord AgriSavant</h1>
          {getTabActions()}
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

export default Index;
