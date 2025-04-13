
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import ParcelMap from '@/components/ParcelMap';
import { Search, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';

interface ParcelMapDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ParcelMapDialog = ({ isOpen, onOpenChange }: ParcelMapDialogProps) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [coordinates, setCoordinates] = useState({ lat: 45.4631, lng: 4.3873 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(zoomLevel + 0.5);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.5);
    }
  };
  
  const handleResetView = () => {
    setZoomLevel(1);
    setCoordinates({ lat: 45.4631, lng: 4.3873 });
  };
  
  const handleExportMap = () => {
    // En situation réelle, cette fonction génèrerait un PDF ou une image de la carte
    const message = "Export de la carte en format PDF";
    const description = "La carte des parcelles a été exportée avec succès";
    console.log(message);
    // Ici, on simulerait l'export
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler une recherche de parcelle sur la carte
    console.log("Recherche de parcelle:", searchQuery);
    // Dans une implémentation réelle, on ajusterait les coordonnées
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Carte des parcelles</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <form onSubmit={handleSearch} className="flex-grow mr-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Rechercher une parcelle..."
                  className="pl-9 pr-4 py-2 w-full border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleResetView}>
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleExportMap}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="h-[500px] bg-gray-100 rounded-lg overflow-hidden" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}>
            <ParcelMap 
              coordinates={coordinates}
              parcelName="Vue d'ensemble"
              isEditing={false}
              onCoordinatesChange={setCoordinates}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Cette vue d'ensemble montre l'emplacement de toutes vos parcelles. 
            Cliquez sur une parcelle spécifique pour voir plus de détails.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelMapDialog;
