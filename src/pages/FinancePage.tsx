
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import FinancialTracking from '../components/FinancialTracking';
import PageHeader from '../components/layout/PageHeader';
import usePageMetadata from '../hooks/use-page-metadata';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload, PieChart, BarChart, CreditCard, DollarSign, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TabContainer, { TabItem } from '../components/layout/TabContainer';

const FinancePage = () => {
  const { toast } = useToast();
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion Financière',
    defaultDescription: 'Suivez vos revenus, dépenses et la rentabilité de votre exploitation agricole'
  });

  const [timeFrame, setTimeFrame] = useState('year');

  const handleExportData = () => {
    toast({
      title: "Export des données financières",
      description: "Vos données ont été exportées au format Excel"
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import de données",
      description: "Veuillez sélectionner un fichier à importer"
    });
  };

  const tabs: TabItem[] = [
    {
      value: 'overview',
      label: 'Aperçu général',
      content: <FinancialTracking />
    },
    {
      value: 'income',
      label: 'Revenus',
      content: (
        <div className="p-6 bg-white rounded-xl border">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            Gestion des Revenus
          </h2>
          <p className="text-muted-foreground mb-6">
            Ce module est en cours de développement. Il permettra de suivre en détail toutes les sources de revenus de votre exploitation.
          </p>
          <div className="flex justify-center items-center h-64">
            <Button variant="outline">Activer ce module</Button>
          </div>
        </div>
      )
    },
    {
      value: 'expenses',
      label: 'Dépenses',
      content: (
        <div className="p-6 bg-white rounded-xl border">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-red-500" />
            Gestion des Dépenses
          </h2>
          <p className="text-muted-foreground mb-6">
            Ce module est en cours de développement. Il permettra de catégoriser et analyser toutes vos dépenses en détail.
          </p>
          <div className="flex justify-center items-center h-64">
            <Button variant="outline">Activer ce module</Button>
          </div>
        </div>
      )
    },
    {
      value: 'reports',
      label: 'Rapports',
      content: (
        <div className="p-6 bg-white rounded-xl border">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
            Rapports Financiers
          </h2>
          <p className="text-muted-foreground mb-6">
            Les rapports détaillés vous permettront de visualiser et analyser vos performances financières sur différentes périodes.
          </p>
          
          <div className="mb-6">
            <Tabs value={timeFrame} onValueChange={setTimeFrame}>
              <TabsList>
                <TabsTrigger value="month">Mois en cours</TabsTrigger>
                <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                <TabsTrigger value="year">Année</TabsTrigger>
                <TabsTrigger value="custom">Personnalisé</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <Button>Générer un rapport</Button>
          </div>
        </div>
      )
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
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
          </div>
        </div>

        <TabContainer tabs={tabs} defaultValue="overview" />
      </div>
    </PageLayout>
  );
};

export default FinancePage;
