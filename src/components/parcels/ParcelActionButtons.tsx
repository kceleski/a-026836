
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, Download, Upload, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ParcelAlert {
  id: number;
  parcel: string;
  type: string;
  severity: string;
}

interface ParcelActionButtonsProps {
  onExportData: () => void;
  onImportData: () => void;
  onOpenMap: () => void;
  activeParcelAlerts: ParcelAlert[];
  weatherAlertsOpen: boolean;
  setWeatherAlertsOpen: (isOpen: boolean) => void;
  getSeverityColor: (severity: string) => string;
}

const ParcelActionButtons = ({
  onExportData,
  onImportData,
  onOpenMap,
  activeParcelAlerts,
  weatherAlertsOpen,
  setWeatherAlertsOpen,
  getSeverityColor
}: ParcelActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={onOpenMap}>
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
      
      <Button variant="outline" onClick={onExportData}>
        <Download className="mr-2 h-4 w-4" />
        Exporter
      </Button>
      
      <Button variant="outline" onClick={onImportData}>
        <Upload className="mr-2 h-4 w-4" />
        Importer
      </Button>
    </div>
  );
};

export default ParcelActionButtons;
