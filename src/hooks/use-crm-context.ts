
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

// Types pour le contexte CRM global
interface CRMContextState {
  lastSync: Date;
  isRefreshing: boolean;
  companyName: string;
  activeModules: string[];
  syncDataAcrossCRM: () => void;
  updateModuleData: (moduleName: string, data: any) => void;
  getModuleData: (moduleName: string) => any;
}

// Hook personnalisé pour gérer le contexte global du CRM
export const useCRMContext = (): CRMContextState => {
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [moduleData, setModuleData] = useState<Record<string, any>>({
    parcelles: {},
    cultures: {},
    finances: {},
    statistiques: {},
    inventaire: {}
  });
  const [activeModules, setActiveModules] = useState<string[]>([
    'parcelles',
    'cultures',
    'finances',
    'statistiques',
    'inventaire'
  ]);
  
  // Nom de l'entreprise
  const companyName = 'Agri Dom';

  // Synchronisation des données à travers tous les modules du CRM
  const syncDataAcrossCRM = useCallback(() => {
    setIsRefreshing(true);
    
    // Simuler un temps de synchronisation
    setTimeout(() => {
      setLastSync(new Date());
      setIsRefreshing(false);
      
      toast.success('Synchronisation terminée', {
        description: 'Toutes les données ont été synchronisées entre les modules'
      });
    }, 1500);
  }, []);

  // Mettre à jour les données d'un module spécifique
  const updateModuleData = useCallback((moduleName: string, data: any) => {
    setModuleData(prevData => ({
      ...prevData,
      [moduleName]: {
        ...prevData[moduleName],
        ...data
      }
    }));
    
    // Mettre à jour la date de dernière synchronisation
    setLastSync(new Date());
    
    // Notification optionnelle
    toast.success(`Module ${moduleName} mis à jour`, {
      description: 'Les changements sont maintenant visibles dans tous les modules liés'
    });
  }, []);

  // Récupérer les données d'un module spécifique
  const getModuleData = useCallback((moduleName: string) => {
    return moduleData[moduleName] || {};
  }, [moduleData]);

  // Synchronisation initiale au chargement
  useEffect(() => {
    const initialSync = setTimeout(() => {
      syncDataAcrossCRM();
    }, 1000);
    
    return () => clearTimeout(initialSync);
  }, [syncDataAcrossCRM]);

  return {
    lastSync,
    isRefreshing,
    companyName,
    activeModules,
    syncDataAcrossCRM,
    updateModuleData,
    getModuleData
  };
};

export default useCRMContext;
