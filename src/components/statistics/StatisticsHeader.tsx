
import React from 'react';
import { Download, Printer, Share2 } from 'lucide-react';

const StatisticsHeader = () => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">Statistiques et Analyses</h1>
        <p className="text-muted-foreground">Visualisez et analysez les données de votre exploitation</p>
      </div>
      <div className="flex space-x-2">
        <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
          <Printer className="h-4 w-4 mr-2" />
          Imprimer
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </button>
      </div>
    </header>
  );
};

export default StatisticsHeader;
