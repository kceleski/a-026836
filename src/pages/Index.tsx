
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import Dashboard from '../components/Dashboard';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import TaskList from '../components/cultures/TaskList';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const tabLabels = {
      dashboard: 'Tableau de Bord',
      harvest: 'Suivi des Récoltes',
      weather: 'Alertes Météo',
      tasks: 'Tâches'
    };
    
    const label = tabLabels[value as keyof typeof tabLabels] || value;
    
    toast({
      title: `${label} activé`,
      description: `Vous consultez maintenant les données de ${label.toLowerCase()}`
    });
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
        <h1 className="text-3xl font-bold mb-6">Tableau de Bord AgriSavant</h1>
        
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
