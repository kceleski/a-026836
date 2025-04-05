
import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Statistics from '../components/Statistics';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import { ChartConfig } from '../components/ui/chart-config';
import { EditableTable, Column } from '../components/ui/editable-table';
import { EditableField } from '../components/ui/editable-field';
import { StatisticsProvider } from '../contexts/StatisticsContext';
import { toast } from 'sonner';
import { BarChart, PieChart, TrendingUp, Download, Filter, RefreshCw, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PerformanceData {
  name: string;
  current: number;
  target: number;
  unit: string;
}

const StatsPage = () => {
  const { toast: shadowToast } = useToast();
  const [pageTitle, setPageTitle] = useState('Statistiques et Analyses');
  const [pageDescription, setPageDescription] = useState('Visualisez et analysez les données de votre exploitation en Guadeloupe');
  const [activeView, setActiveView] = useState<'performance' | 'harvest' | 'detailed'>('performance');
  const [lastSyncDate, setLastSyncDate] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [connectedModules, setConnectedModules] = useState<string[]>(['parcelles', 'cultures', 'finances']);
  
  // Exemple de données adaptées à l'agriculture guadeloupéenne
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([
    { name: 'Rendement Canne à Sucre', current: 75, target: 85, unit: 't/ha' },
    { name: 'Qualité Banane Export', current: 88, target: 95, unit: '%' },
    { name: 'Rentabilité Ananas', current: 70, target: 80, unit: '%' },
    { name: 'Certification Bio', current: 25, target: 40, unit: '%' },
    { name: 'Innovation Igname', current: 60, target: 75, unit: '%' },
  ]);
  
  // Simuler la synchronisation des données avec les autres modules
  useEffect(() => {
    const initialSync = setTimeout(() => {
      toast.success('Modules connectés', {
        description: 'Les modules Parcelles, Cultures et Finances sont maintenant connectés aux statistiques'
      });
    }, 1000);
    
    return () => clearTimeout(initialSync);
  }, []);
  
  // Synchronisation des données
  const syncData = () => {
    setIsSyncing(true);
    toast.info('Synchronisation des données', {
      description: 'Récupération des dernières données depuis tous les modules connectés...'
    });
    
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncDate(new Date());
      toast.success('Données synchronisées', {
        description: 'Toutes les statistiques sont à jour avec les dernières données des modules'
      });
      
      // Notification aux autres modules
      shadowToast({
        title: "Statistiques mises à jour",
        description: "Les indicateurs de performance ont été recalculés avec les dernières données"
      });
    }, 2000);
  };
  
  // Colonnes du tableau éditable
  const columns: Column[] = [
    { id: 'name', header: 'Indicateur', accessorKey: 'name', isEditable: true },
    { id: 'current', header: 'Valeur actuelle', accessorKey: 'current', type: 'number', isEditable: true },
    { id: 'target', header: 'Objectif', accessorKey: 'target', type: 'number', isEditable: true },
    { id: 'unit', header: 'Unité', accessorKey: 'unit', isEditable: true },
  ];
  
  // Gestionnaire de mise à jour du tableau
  const handleTableUpdate = (rowIndex: number, columnId: string, value: any) => {
    const newData = [...performanceData];
    const updatedRow = { ...newData[rowIndex] } as PerformanceData;
    
    // Typages corrects et explicites pour chaque propriété
    if (columnId === 'current' || columnId === 'target') {
      updatedRow[columnId as 'current' | 'target'] = Number(value);
    } else if (columnId === 'name' || columnId === 'unit') {
      updatedRow[columnId as 'name' | 'unit'] = String(value);
    }
    
    newData[rowIndex] = updatedRow;
    setPerformanceData(newData);
    
    // Notification pour l'utilisateur
    toast.success('Données mises à jour', {
      description: `L'indicateur ${updatedRow.name} a été mis à jour avec succès.`
    });
    
    // Synchronisation avec les autres modules
    shadowToast({
      title: "Mise à jour des indicateurs",
      description: `Les modules connectés ont été informés de la mise à jour de ${updatedRow.name}`
    });
  };
  
  // Gestionnaire de suppression de ligne
  const handleDeleteRow = (rowIndex: number) => {
    const newData = [...performanceData];
    const deletedItem = newData[rowIndex];
    newData.splice(rowIndex, 1);
    setPerformanceData(newData);
    
    // Notification pour l'utilisateur
    toast.success('Indicateur supprimé', {
      description: `L'indicateur ${deletedItem.name} a été supprimé avec succès.`
    });
    
    // Synchronisation avec les autres modules
    shadowToast({
      title: "Suppression d'indicateur",
      description: `Les modules connectés ont été informés de la suppression de ${deletedItem.name}`
    });
  };
  
  // Gestionnaire d'ajout de ligne
  const handleAddRow = (newRow: Record<string, any>) => {
    const typedRow: PerformanceData = {
      name: String(newRow.name || ''),
      current: Number(newRow.current || 0),
      target: Number(newRow.target || 0),
      unit: String(newRow.unit || '%'),
    };
    setPerformanceData([...performanceData, typedRow]);
    
    // Notification pour l'utilisateur
    toast.success('Nouvel indicateur ajouté', {
      description: `L'indicateur ${typedRow.name} a été ajouté avec succès.`
    });
    
    // Synchronisation avec les autres modules
    shadowToast({
      title: "Nouvel indicateur ajouté",
      description: `Les modules connectés ont été informés de l'ajout de ${typedRow.name}`
    });
  };

  // Handlers de titre
  const handleTitleChange = (value: string | number) => {
    setPageTitle(String(value));
    toast.success('Titre modifié', {
      description: 'Le titre de la page a été mis à jour.'
    });
  };

  const handleDescriptionChange = (value: string | number) => {
    setPageDescription(String(value));
    toast.success('Description modifiée', {
      description: 'La description de la page a été mise à jour.'
    });
  };
  
  // Handler de changement de vue
  const handleViewChange = (view: 'performance' | 'harvest' | 'detailed') => {
    setActiveView(view);
    toast.info('Vue modifiée', {
      description: `Vous consultez maintenant la vue ${
        view === 'performance' ? 'Indicateurs de performance' : 
        view === 'harvest' ? 'Suivi des récoltes' : 'Statistiques détaillées'
      }`
    });
    
    // Notification aux autres modules
    shadowToast({
      title: "Changement de vue statistique",
      description: `Les modules connectés ont été adaptés à la vue ${view === 'performance' ? 'indicateurs' : view === 'harvest' ? 'récoltes' : 'détaillée'}`
    });
  };
  
  // Handler d'export des données
  const handleExportData = () => {
    toast.success('Export des données', {
      description: 'Les données statistiques ont été exportées avec succès.'
    });
    
    // Notification aux autres modules
    shadowToast({
      title: "Export des statistiques",
      description: "Les données exportées sont disponibles pour tous les modules"
    });
  };

  return (
    <StatisticsProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 animate-enter">
            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  <EditableField
                    value={pageTitle}
                    onSave={handleTitleChange}
                    className="inline-block"
                  />
                </h1>
                <p className="text-muted-foreground">
                  <EditableField
                    value={pageDescription}
                    onSave={handleDescriptionChange}
                    className="inline-block"
                  />
                </p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <span className="mr-2">Modules connectés: {connectedModules.join(', ')}</span>
                  <span>Dernière synchro: {lastSyncDate.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleViewChange('performance')}
                  className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
                    activeView === 'performance' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <PieChart className="h-4 w-4 mr-1.5" />
                  Indicateurs
                </button>
                
                <button 
                  onClick={() => handleViewChange('harvest')}
                  className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
                    activeView === 'harvest' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <BarChart className="h-4 w-4 mr-1.5" />
                  Récoltes
                </button>
                
                <button 
                  onClick={() => handleViewChange('detailed')}
                  className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
                    activeView === 'detailed' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <TrendingUp className="h-4 w-4 mr-1.5" />
                  Détaillé
                </button>
                
                <button 
                  onClick={handleExportData}
                  className="px-3 py-1.5 rounded-md flex items-center text-sm bg-muted hover:bg-muted/80"
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  Exporter
                </button>
                
                <button 
                  onClick={syncData}
                  className="px-3 py-1.5 rounded-md flex items-center text-sm bg-muted hover:bg-muted/80"
                  disabled={isSyncing}
                >
                  <RefreshCw className={`h-4 w-4 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Synchronisation...' : 'Synchroniser'}
                </button>
                
                <button 
                  onClick={() => {
                    toast.success('Notifications configurées', {
                      description: 'Vos préférences de notification ont été mises à jour'
                    });
                  }}
                  className="px-3 py-1.5 rounded-md flex items-center text-sm bg-muted hover:bg-muted/80"
                >
                  <Bell className="h-4 w-4 mr-1.5" />
                  Alertes
                </button>
              </div>
            </header>
            
            {activeView === 'performance' && (
              <div className="mb-8">
                <ChartConfig 
                  title="Indicateurs de performance agricole en Guadeloupe"
                  description="Suivez vos performances par rapport à vos objectifs pour les cultures guadeloupéennes"
                  onTitleChange={(title) => {
                    toast.success('Titre modifié', {
                      description: 'Le titre du graphique a été mis à jour.'
                    });
                  }}
                  onDescriptionChange={(desc) => {
                    toast.success('Description modifiée', {
                      description: 'La description du graphique a été mise à jour.'
                    });
                  }}
                  onOptionsChange={(options) => {
                    toast.success('Options mises à jour', {
                      description: 'Les options du graphique ont été mises à jour.'
                    });
                  }}
                  className="mb-6"
                >
                  <div className="p-4">
                    <EditableTable
                      data={performanceData}
                      columns={columns}
                      onUpdate={handleTableUpdate}
                      onDelete={handleDeleteRow}
                      onAdd={handleAddRow}
                      className="border-none"
                    />
                  </div>
                </ChartConfig>
              </div>
            )}
            
            {activeView === 'harvest' && (
              <GuadeloupeHarvestTracking />
            )}
            
            {activeView === 'detailed' && (
              <Statistics />
            )}
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </StatisticsProvider>
  );
};

export default StatsPage;
