
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/layout/PageHeader';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import CropPlanning from '../components/CropPlanning';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeSpecificCrops from '../components/GuadeloupeSpecificCrops';
import GuadeloupeRainfallTracking from '../components/GuadeloupeRainfallTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import usePageMetadata from '../hooks/use-page-metadata';
import { Button } from '@/components/ui/button';
import { Download, Filter, HelpCircle, Upload, CloudLightning, Calendar, Search, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CropsPage = () => {
  const { toast } = useToast();
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Cultures Guadeloupéennes',
    defaultDescription: 'Surveillez, planifiez et optimisez toutes vos cultures adaptées au climat tropical'
  });
  
  const [activeViewType, setActiveViewType] = useState<'all' | 'fruits' | 'vegetables' | 'cash'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, type: 'Pluie intense', region: 'Basse-Terre', severity: 'Haute' },
    { id: 2, type: 'Tempête tropicale', region: 'Grande-Terre', severity: 'Extrême' }
  ]);

  const handleExportData = () => {
    toast({
      title: "Export des données",
      description: "L'export de toutes les données des cultures a démarré"
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
  };

  const handleShowHelp = () => {
    setHelpDialogOpen(true);
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

  // Fonction pour obtenir la couleur de sévérité
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

  const tabs: TabItem[] = [
    {
      value: 'crops',
      label: 'Cultures',
      content: (
        <div className="space-y-6">
          <GuadeloupeSpecificCrops />
          <CropPlanning />
        </div>
      )
    },
    {
      value: 'harvest',
      label: 'Récoltes',
      content: <GuadeloupeHarvestTracking />
    },
    {
      value: 'rainfall',
      label: 'Précipitations',
      content: <GuadeloupeRainfallTracking />
    },
    {
      value: 'weather',
      label: 'Alertes Météo',
      content: <GuadeloupeWeatherAlerts />
    }
  ];

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <PageHeader 
            title={title}
            description={description}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
          
          <div className="flex flex-wrap gap-2">
            {activeAlerts.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative">
                    <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                    Alertes
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {activeAlerts.length}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                      Alertes météo actives
                    </h4>
                  </div>
                  <div className="divide-y max-h-80 overflow-auto">
                    {activeAlerts.map(alert => (
                      <div key={alert.id} className="p-3 hover:bg-muted/20">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{alert.type}</span>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.region}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t bg-muted/10">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => document.getElementById('weather-tab')?.click()}>
                      Voir toutes les alertes
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            
            <form onSubmit={handleSearch} className="flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-9 w-full md:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            
            <Select 
              value={activeViewType} 
              onValueChange={(value) => setActiveViewType(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Toutes les cultures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les cultures</SelectItem>
                <SelectItem value="fruits">Fruits tropicaux</SelectItem>
                <SelectItem value="vegetables">Légumes</SelectItem>
                <SelectItem value="cash">Cultures de rente</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            
            <Button variant="outline" onClick={handleShowHelp}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Aide
            </Button>
            
            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importer des données</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Choisissez le type de données à importer:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('des cultures')}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Planning de cultures (CSV)
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('de récolte')}>
                      <Download className="h-4 w-4 mr-2" />
                      Données de récolte (Excel)
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('de pluviométrie')}>
                      <CloudLightning className="h-4 w-4 mr-2" />
                      Données pluviométriques (CSV)
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={() => setImportDialogOpen(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Aide - Gestion des Cultures</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="space-y-2 pb-4 border-b">
                    <h3 className="text-lg font-medium">Guide de l'Interface</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <Filter className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Filtres</h4>
                          <p className="text-sm text-muted-foreground">Utilisez les filtres pour affiner votre vue par type de culture.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <Download className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Exportation</h4>
                          <p className="text-sm text-muted-foreground">Exportez vos données au format CSV ou Excel pour les utiliser ailleurs.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Importation</h4>
                          <p className="text-sm text-muted-foreground">Importez des données externes pour compléter votre planning.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">Alertes</h4>
                          <p className="text-sm text-muted-foreground">Consultez les alertes météorologiques qui pourraient affecter vos cultures.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pb-4 border-b">
                    <h3 className="text-lg font-medium">Onglets disponibles</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-2">
                        <div className="mt-0.5">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div>
                          <h4 className="font-medium">Cultures</h4>
                          <p className="text-sm text-muted-foreground">Visualisez et gérez toutes vos cultures actuelles et futures.</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-0.5">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        </div>
                        <div>
                          <h4 className="font-medium">Récoltes</h4>
                          <p className="text-sm text-muted-foreground">Suivez les rendements et la qualité de vos récoltes.</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-0.5">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        </div>
                        <div>
                          <h4 className="font-medium">Précipitations</h4>
                          <p className="text-sm text-muted-foreground">Analysez les données pluviométriques pour optimiser l'irrigation.</p>
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="mt-0.5">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        </div>
                        <div>
                          <h4 className="font-medium">Alertes Météo</h4>
                          <p className="text-sm text-muted-foreground">Restez informé des conditions météorologiques qui pourraient affecter vos cultures.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Ressources supplémentaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start">
                        <FileIcon className="h-4 w-4 mr-2" />
                        Guide de l'utilisateur (PDF)
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <VideoIcon className="h-4 w-4 mr-2" />
                        Tutoriels vidéo
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ListChecks className="h-4 w-4 mr-2" />
                        Guide des meilleures pratiques
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <MailIcon className="h-4 w-4 mr-2" />
                        Contacter le support
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setHelpDialogOpen(false)}>
                    Fermer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabContainer tabs={tabs} defaultValue="crops" />
      </div>
    </PageLayout>
  );
};

// Icons used in Help dialog
const FileIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const VideoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2"/>
    <path d="m10 10 5 3-5 3Z"/>
  </svg>
);

const ListChecks = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="10" y1="6" x2="21" y2="6"/>
    <line x1="10" y1="12" x2="21" y2="12"/>
    <line x1="10" y1="18" x2="21" y2="18"/>
    <path d="M3 6h.01"/>
    <path d="M3 12h.01"/>
    <path d="M3 18h.01"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export default CropsPage;
