
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ParcelManagement from '../components/ParcelManagement';
import PageHeader from '../components/layout/PageHeader';
import usePageMetadata from '../hooks/use-page-metadata';
import { Button } from '@/components/ui/button';
import { Download, Upload, Plus, Search, Filter, Map, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ParcelMap from '@/components/ParcelMap';

const ParcelsPage = () => {
  const { toast } = useToast();
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
  
  const [activeParcelAlerts, setActiveParcelAlerts] = useState([
    { id: 1, parcel: 'Parcelle A12', type: 'Pluie intense', severity: 'Haute' },
    { id: 2, parcel: 'Parcelle B05', type: 'Sécheresse', severity: 'Moyenne' }
  ]);

  const handleExportData = () => {
    toast({
      title: "Export des données",
      description: "L'export de toutes les données des parcelles a démarré"
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
            <form onSubmit={handleSearch} className="flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Rechercher une parcelle..."
                  className="pl-9 w-full md:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Parcelles actives</SelectItem>
                <SelectItem value="fallow">En jachère</SelectItem>
                <SelectItem value="planned">Planifiées</SelectItem>
                <SelectItem value="rented">Louées</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="field">Champs</SelectItem>
                <SelectItem value="greenhouse">Serres</SelectItem>
                <SelectItem value="orchard">Vergers</SelectItem>
                <SelectItem value="experimental">Expérimentales</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => setMapPreviewOpen(true)}>
              <Map className="mr-2 h-4 w-4" />
              Carte
            </Button>
            
            {activeParcelAlerts.length > 0 && (
              <Popover open={weatherAlertsOpen} onOpenChange={setWeatherAlertsOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative">
                    <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                    Alertes
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {activeParcelAlerts.length}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                      Alertes sur parcelles
                    </h4>
                  </div>
                  <div className="divide-y max-h-80 overflow-auto">
                    {activeParcelAlerts.map(alert => (
                      <div key={alert.id} className="p-3 hover:bg-muted/20">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{alert.parcel}</span>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.type}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t bg-muted/10">
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => setWeatherAlertsOpen(false)}>
                      Fermer
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            
            <Dialog open={mapPreviewOpen} onOpenChange={setMapPreviewOpen}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Carte des parcelles</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                    <ParcelMap 
                      coordinates={{ lat: 45.4631, lng: 4.3873 }}
                      parcelName="Vue d'ensemble"
                      isEditing={false}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Cette vue d'ensemble montre l'emplacement de toutes vos parcelles. 
                    Cliquez sur une parcelle spécifique pour voir plus de détails.
                  </p>
                  <div className="flex justify-end">
                    <Button onClick={() => setMapPreviewOpen(false)}>
                      Fermer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importer des données</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Choisissez le type de données à importer:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('parcellaires')}>
                      <Map className="h-4 w-4 mr-2" />
                      Données parcellaires (CSV)
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('géospatiales')}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Données géospatiales (GeoJSON)
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('de cultures')}>
                      <Filter className="h-4 w-4 mr-2" />
                      Historique des cultures (Excel)
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
          </div>
        </div>

        <ParcelManagement 
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          filterType={filterType}
        />
      </div>
    </PageLayout>
  );
};

export default ParcelsPage;
