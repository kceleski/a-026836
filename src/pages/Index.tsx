
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import Dashboard from '../components/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import TaskList from '../components/cultures/TaskList';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    toast({
      title: `${value} activé`,
      description: `Vous consultez maintenant les données de ${value}`
    });
  };

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <h1 className="text-3xl font-bold mb-6">Tableau de Bord AgriSavant</h1>
        
        <Tabs defaultValue="dashboard" onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
            <TabsTrigger value="harvest">Suivi des Récoltes</TabsTrigger>
            <TabsTrigger value="weather">Alertes Météo</TabsTrigger>
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="harvest">
            <GuadeloupeHarvestTracking />
          </TabsContent>
          
          <TabsContent value="weather">
            <GuadeloupeWeatherAlerts />
          </TabsContent>
          
          <TabsContent value="tasks">
            <TaskList />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Index;
