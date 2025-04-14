
import React, { useState } from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCRM } from '../../contexts/CRMContext';
import ReportGenerationButton from '../common/ReportGenerationButton';

const StatisticsHeader = () => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const { exportModuleData, printModuleData } = useCRM();

  const handleExport = async () => {
    try {
      await exportModuleData('statistiques', 'csv');
    } catch (error) {
      console.error("Error exporting statistics:", error);
    }
  };

  const handlePrint = async () => {
    try {
      await printModuleData('statistiques');
    } catch (error) {
      console.error("Error printing statistics:", error);
    }
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };
  
  const handleShareByEmail = () => {
    setShareDialogOpen(false);
  };
  
  const handleShareByPDF = async () => {
    try {
      await exportModuleData('statistiques', 'pdf');
      setShareDialogOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setShareDialogOpen(false);
    }
  };

  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1 text-gray-800">Statistiques et Analyses</h1>
        <p className="text-gray-500">Visualisez et analysez les données de votre exploitation</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ReportGenerationButton 
          moduleName="statistiques" 
          className="bg-green-600 hover:bg-green-700 text-white"
        />
        
        <Button 
          variant="outline" 
          onClick={handleExport}
          className="bg-white border-gray-200 hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2 text-gray-600" />
          Exporter CSV
        </Button>
        <Button 
          variant="outline" 
          onClick={handlePrint}
          className="bg-white border-gray-200 hover:bg-gray-50"
        >
          <Printer className="h-4 w-4 mr-2 text-gray-600" />
          Imprimer
        </Button>
        <Button 
          variant="outline" 
          onClick={handleShare}
          className="bg-white border-gray-200 hover:bg-gray-50"
        >
          <Share2 className="h-4 w-4 mr-2 text-gray-600" />
          Partager
        </Button>
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
              <Button onClick={handleShareByPDF} className="bg-green-600 hover:bg-green-700">
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
