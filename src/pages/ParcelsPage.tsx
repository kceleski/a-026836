
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ParcelManagement from '../components/ParcelManagement';
import PageHeader from '../components/layout/PageHeader';
import usePageMetadata from '../hooks/use-page-metadata';
import { useToast } from '@/hooks/use-toast';
import ParcelFilters from '../components/parcels/ParcelFilters';
import ParcelActionButtons from '../components/parcels/ParcelActionButtons';
import ParcelMapDialog from '../components/parcels/ParcelMapDialog';
import ParcelImportDialog from '../components/parcels/ParcelImportDialog';
import GuadeloupeParcelManagement from '../components/GuadeloupeParcelManagement';
import { toast } from 'sonner';

const ParcelsPage = () => {
  const { toast: shadowToast } = useToast();
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Parcelles',
    defaultDescription: 'Gérez, organisez et optimisez toutes vos parcelles agricoles'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [mapPreviewOpen, setMapPreviewOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [weatherAlertsOpen, setWeatherAlertsOpen] = useState(false);
  const [showGuadeloupeView, setShowGuadeloupeView] = useState(true);
  const [lastSyncDate, setLastSyncDate] = useState<Date>(new Date());
  
  const [activeParcelAlerts, setActiveParcelAlerts] = useState([
    { id: 1, parcel: 'Parcelle A12', type: 'Pluie intense', severity: 'Haute' },
    { id: 2, parcel: 'Parcelle B05', type: 'Sécheresse', severity: 'Moyenne' }
  ]);

  // Simuler la synchronisation des données avec les autres modules
  useEffect(() => {
    const syncWithOtherModules = () => {
      toast.info("Synchronisation", {
        description: "Synchronisation des données avec les modules de cultures et de statistiques"
      });
      
      // Simule un délai de synchronisation
      const timer = setTimeout(() => {
        setLastSyncDate(new Date());
        toast.success("Synchronisation terminée", {
          description: "Les données des parcelles sont maintenant synchronisées avec tous les modules"
        });
      }, 1500);
      
      return () => clearTimeout(timer);
    };
    
    syncWithOtherModules();
  }, []);

  const handleExportData = () => {
    toast({
      title: "Export des données",
      description: "L'export de toutes les données des parcelles a démarré"
    });
    
    // Synchronisation avec d'autres modules
    shadowToast({
      title: "Notification inter-modules",
      description: "Les données exportées sont maintenant disponibles dans le module Statistiques"
    });
  };

  const handleImportData = () => {
    setImportDialogOpen(true);
  };
  
  const handleImportConfirm = (importType: string) => {
    setImportDialogOpen(false);
    toast({
      title: "Import de données réussi",
      description: `Les données ${importType} ont été importées avec succès`
    });
    
    // Mise à jour des autres modules
    shadowToast({
      title: "Mise à jour des modules liés",
      description: "Les modules Cultures et Statistiques ont été mis à jour avec les nouvelles données"
    });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      toast({
        title: "Recherche effectuée",
        description: `Résultats pour "${searchTerm}" affichés`
      });
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Basse':
        return 'bg-green-100 text-green-800';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'Haute':
        return 'bg-orange-100 text-orange-800';
      case 'Extrême':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleView = () => {
    setShowGuadeloupeView(!showGuadeloupeView);
    toast({
      title: `Vue ${showGuadeloupeView ? 'Standard' : 'Guadeloupe'} activée`,
      description: `Vous utilisez maintenant la vue ${showGuadeloupeView ? 'standard' : 'spécifique à la Guadeloupe'}`
    });
    
    // Synchronisation avec d'autres modules
    shadowToast({
      title: "Changement de vue",
      description: "Les données affichées dans les modules Cultures et Finances ont été adaptées"
    });
  };

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <PageHeader 
              title={title}
              description={description}
              onTitleChange={handleTitleChange}
              onDescriptionChange={handleDescriptionChange}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Dernière synchronisation avec les autres modules: {lastSyncDate.toLocaleString()}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <ParcelFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterType={filterType}
              setFilterType={setFilterType}
              onSearch={handleSearch}
            />
            
            <ParcelActionButtons 
              onExportData={handleExportData}
              onImportData={handleImportData}
              onOpenMap={() => setMapPreviewOpen(true)}
              activeParcelAlerts={activeParcelAlerts}
              weatherAlertsOpen={weatherAlertsOpen}
              setWeatherAlertsOpen={setWeatherAlertsOpen}
              getSeverityColor={getSeverityColor}
            />
            
            <button 
              className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors"
              onClick={toggleView}
            >
              {showGuadeloupeView ? 'Vue Standard' : 'Vue Guadeloupe'}
            </button>
          </div>
        </div>

        {showGuadeloupeView ? (
          <GuadeloupeParcelManagement />
        ) : (
          <ParcelManagement />
        )}
        
        <ParcelMapDialog 
          isOpen={mapPreviewOpen} 
          onOpenChange={setMapPreviewOpen} 
        />
        
        <ParcelImportDialog 
          isOpen={importDialogOpen} 
          onOpenChange={setImportDialogOpen}
          onImportConfirm={handleImportConfirm}
        />
      </div>
    </PageLayout>
  );
};

export default ParcelsPage;
