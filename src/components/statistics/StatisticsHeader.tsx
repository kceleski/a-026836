
import React, { useState } from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const StatisticsHeader = () => {
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleExport = () => {
    toast({
      title: "Export des statistiques",
      description: "Vos statistiques sont en cours d'exportation au format CSV"
    });
    
    // Simulate export download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'statistiques_agricoles.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export terminé",
        description: "Votre fichier a été téléchargé avec succès"
      });
    }, 1500);
  };

  const handlePrint = () => {
    toast({
      title: "Impression des statistiques",
      description: "Préparation du document pour impression"
    });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };
  
  const handleShareByEmail = () => {
    toast({
      title: "Partage par email",
      description: "Un lien vers vos statistiques a été envoyé par email"
    });
    setShareDialogOpen(false);
  };
  
  const handleShareByPDF = () => {
    toast({
      title: "Génération du PDF",
      description: "Votre rapport PDF est en cours de génération"
    });
    
    setTimeout(() => {
      toast({
        title: "PDF généré",
        description: "Le rapport a été généré et téléchargé"
      });
    }, 2000);
    
    setShareDialogOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Statistiques et Analyses</h1>
        <p className="text-muted-foreground">Visualisez et analysez les données de votre exploitation</p>
      </div>
      <div className="flex space-x-2">
        <button 
          className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </button>
        <button 
          className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </button>
        <button 
          className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </button>
      </div>
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Partager les statistiques</DialogTitle>
            <DialogDescription>
              Choisissez comment vous souhaitez partager ces statistiques
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleShareByEmail} variant="outline">
                Envoyer par email
              </Button>
              <Button onClick={handleShareByPDF}>
                Générer un PDF
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default StatisticsHeader;
