
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import FinancialTracking from '../components/FinancialTracking';
import PageHeader from '../components/layout/PageHeader';
import usePageMetadata from '../hooks/use-page-metadata';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload, PieChart, BarChart, CreditCard, DollarSign, Filter, CalendarRange, Plus, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditableField } from '@/components/ui/editable-field';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const [filterCategory, setFilterCategory] = useState('all');
  const [incomeTitle, setIncomeTitle] = useState('Gestion des Revenus');
  const [incomeDescription, setIncomeDescription] = useState('Suivez, catégorisez et analysez toutes vos sources de revenus agricoles');
  const [expensesTitle, setExpensesTitle] = useState('Gestion des Dépenses');
  const [expensesDescription, setExpensesDescription] = useState('Catégorisez et optimisez toutes vos dépenses liées à l\'exploitation');
  const [reportsTitle, setReportsTitle] = useState('Rapports Financiers');
  const [reportsDescription, setReportsDescription] = useState('Générez des rapports détaillés pour analyser la performance financière de votre exploitation');
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleExportData = () => {
    toast({
      title: "Export des données financières",
      description: "Vos données ont été exportées au format Excel"
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

  const handleGenerateReport = () => {
    toast({
      title: "Génération de rapport",
      description: `Rapport financier ${timeFrame} généré et prêt à télécharger`
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
            <EditableField
              value={incomeTitle}
              onSave={(value) => {
                setIncomeTitle(String(value));
                toast({
                  title: "Titre mis à jour",
                  description: "Le titre de la section revenus a été modifié"
                });
              }}
            />
          </h2>
          <p className="text-muted-foreground mb-6">
            <EditableField
              value={incomeDescription}
              onSave={(value) => {
                setIncomeDescription(String(value));
                toast({
                  title: "Description mise à jour",
                  description: "La description de la section revenus a été modifiée"
                });
              }}
            />
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-200">Ventes</Badge> 
                  Récoltes
                </CardTitle>
                <CardDescription>Ventes de produits agricoles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45 860 €</div>
                <p className="text-sm text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7h-2z" clipRule="evenodd" />
                  </svg>
                  +12.5% comparé à l'an dernier
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Subventions</Badge> 
                  PAC
                </CardTitle>
                <CardDescription>Aides agricoles et subventions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18 500 €</div>
                <p className="text-sm text-blue-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M1 10a5 5 0 015-5h8a5 5 0 015 5v8a1 1 0 01-1 1H1a1 1 0 01-1-1v-8z" clipRule="evenodd" />
                  </svg>
                  Stable par rapport à l'an dernier
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Badge className="mr-2 bg-purple-100 text-purple-800 hover:bg-purple-200">Autres</Badge> 
                  Revenues
                </CardTitle>
                <CardDescription>Locations, visites, services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 250 €</div>
                <p className="text-sm text-purple-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7h-2z" clipRule="evenodd" />
                  </svg>
                  +28.3% comparé à l'an dernier
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sources de revenus récentes</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un revenu
            </Button>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-6 text-center">
            <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Module de gestion des revenus</h3>
            <p className="text-muted-foreground mb-4">
              Activez ce module pour suivre en détail toutes vos sources de revenus
              et générer des rapports personnalisés.
            </p>
            <Button>Activer ce module</Button>
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
            <EditableField
              value={expensesTitle}
              onSave={(value) => {
                setExpensesTitle(String(value));
                toast({
                  title: "Titre mis à jour",
                  description: "Le titre de la section dépenses a été modifié"
                });
              }}
            />
          </h2>
          <p className="text-muted-foreground mb-6">
            <EditableField
              value={expensesDescription}
              onSave={(value) => {
                setExpensesDescription(String(value));
                toast({
                  title: "Description mise à jour",
                  description: "La description de la section dépenses a été modifiée"
                });
              }}
            />
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Badge className="mr-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Intrants</Badge> 
                  Semences & Fertilisants
                </CardTitle>
                <CardDescription>Achats pour la production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 750 €</div>
                <p className="text-sm text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100-2H7.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L7.414 13H12z" clipRule="evenodd" />
                  </svg>
                  +8.3% comparé à l'an dernier
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Badge className="mr-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Équipement</Badge> 
                  Matériel
                </CardTitle>
                <CardDescription>Machines et outils</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23 600 €</div>
                <p className="text-sm text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M8 7a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H4a1 1 0 110-2h3V8a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  -15.2% comparé à l'an dernier
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Badge className="mr-2 bg-teal-100 text-teal-800 hover:bg-teal-200">Services</Badge> 
                  Main d'oeuvre
                </CardTitle>
                <CardDescription>Salaires, prestataires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 320 €</div>
                <p className="text-sm text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100-2H7.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L7.414 13H12z" clipRule="evenodd" />
                  </svg>
                  +5.7% comparé à l'an dernier
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Dépenses récentes</h3>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="intrants">Intrants</SelectItem>
                <SelectItem value="equipement">Équipement</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="administrative">Administrative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted/20 rounded-lg p-6 text-center">
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-semibold mb-2">Module de gestion des dépenses</h3>
            <p className="text-muted-foreground mb-4">
              Activez ce module pour catégoriser, suivre et optimiser 
              toutes vos dépenses en détail.
            </p>
            <Button>Activer ce module</Button>
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
            <EditableField
              value={reportsTitle}
              onSave={(value) => {
                setReportsTitle(String(value));
                toast({
                  title: "Titre mis à jour",
                  description: "Le titre de la section rapports a été modifié"
                });
              }}
            />
          </h2>
          <p className="text-muted-foreground mb-6">
            <EditableField
              value={reportsDescription}
              onSave={(value) => {
                setReportsDescription(String(value));
                toast({
                  title: "Description mise à jour",
                  description: "La description de la section rapports a été modifiée"
                });
              }}
            />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-indigo-500" />
                  Rapports disponibles
                </CardTitle>
                <CardDescription>
                  Sélectionnez un rapport à générer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                  <BarChart className="h-4 w-4 mr-2" />
                  Rapport de rentabilité
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Analyse des dépenses
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Récapitulatif des revenus
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Flux de trésorerie {timeFrame === 'year' ? 'annuel' : timeFrame === 'quarter' ? 'trimestriel' : 'mensuel'}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-teal-500" />
                  Rapports récents
                </CardTitle>
                <CardDescription>
                  Vos derniers rapports générés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Rapport de rentabilité</p>
                      <p className="text-xs text-muted-foreground">Généré le 15/05/2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Analyse des dépenses</p>
                      <p className="text-xs text-muted-foreground">Généré le 10/05/2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Récapitulatif des revenus</p>
                      <p className="text-xs text-muted-foreground">Généré le 05/05/2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button className="w-full" onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Générer un nouveau rapport
          </Button>
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
            
            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Importer des données financières</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Choisissez le type de données à importer:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('bancaires')}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Données bancaires (CSV)
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('comptables')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Données comptables (Excel)
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => handleImportConfirm('factures')}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Factures scannées (PDF)
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

        <TabContainer tabs={tabs} defaultValue="overview" />
      </div>
    </PageLayout>
  );
};

export default FinancePage;
