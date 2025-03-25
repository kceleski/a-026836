
import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { EditableField } from './ui/editable-field';
import { Trash2, Plus, CirclePlus, Carrot, CloudRain, Thermometer, PlaneTakeoff, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface CropData {
  id: number;
  name: string;
  variety: string;
  region: string;
  harvestPeriod: string;
  specificNotes: string;
  climateRequirements: string;
  marketInfo: string;
}

const GuadeloupeSpecificCrops = () => {
  const [crops, setCrops] = useState<CropData[]>([
    { 
      id: 1, 
      name: 'Canne à Sucre', 
      variety: 'R579', 
      region: 'Grande-Terre', 
      harvestPeriod: 'Février-Juin', 
      specificNotes: 'Résistante à la sécheresse et à fort rendement',
      climateRequirements: 'Tropical, 25-30°C, 1500mm pluie/an',
      marketInfo: 'Exportation vers UE, transformation locale (rhum, sucre)'
    },
    { 
      id: 2, 
      name: 'Banane', 
      variety: 'Poyo', 
      region: 'Basse-Terre', 
      harvestPeriod: 'Toute l\'année', 
      specificNotes: 'Adaptée aux sols volcaniques, sensible aux cyclones',
      climateRequirements: 'Tropical humide, 20-35°C, protection vent',
      marketInfo: 'Exportation majeure vers France métropolitaine et UE'
    },
    { 
      id: 3, 
      name: 'Igname', 
      variety: 'Pacala', 
      region: 'Nord Grande-Terre', 
      harvestPeriod: 'Décembre-Mars', 
      specificNotes: 'Tubercule traditionnel très apprécié localement',
      climateRequirements: 'Tolère périodes sèches, besoin bon drainage',
      marketInfo: 'Marché local principalement, forte demande en période festive'
    },
    { 
      id: 4, 
      name: 'Ananas', 
      variety: 'Bouteille', 
      region: 'Capesterre', 
      harvestPeriod: 'Juillet-Octobre', 
      specificNotes: 'Variété locale très sucrée et aromatique',
      climateRequirements: 'Bonne exposition soleil, drainage efficace',
      marketInfo: 'Marchés locaux et tourisme, potentiel transformation (jus, confitures)'
    },
    { 
      id: 5, 
      name: 'Madère', 
      variety: 'Blanche', 
      region: 'Toute l\'île', 
      harvestPeriod: 'Septembre-Décembre', 
      specificNotes: 'Culture vivrière essentielle dans l\'alimentation locale',
      climateRequirements: 'S\'adapte à différents types de sols',
      marketInfo: 'Consommation locale importante, peu exportée'
    },
    { 
      id: 6, 
      name: 'Café', 
      variety: 'Guadeloupe Bonifieur', 
      region: 'Basse-Terre (montagne)', 
      harvestPeriod: 'Octobre-Janvier', 
      specificNotes: 'Café d\'altitude de grande qualité, production limitée',
      climateRequirements: 'Zones ombragées, altitude 300-700m',
      marketInfo: 'Marché de niche, valorisation forte et exportation limitée'
    },
    { 
      id: 7, 
      name: 'Vanille', 
      variety: 'Vanille Bourbon', 
      region: 'Côte-sous-le-vent', 
      harvestPeriod: 'Mai-Juillet', 
      specificNotes: 'Culture sous ombrière, pollinisation manuelle',
      climateRequirements: 'Humidité élevée, protection du soleil direct',
      marketInfo: 'Haute valeur ajoutée, produit de luxe pour export et tourisme'
    },
  ]);

  const [title, setTitle] = useState('Cultures Spécifiques de la Guadeloupe');
  const [description, setDescription] = useState('Base de données des cultures locales adaptées aux conditions guadeloupéennes');
  
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);

  const handleEdit = (id: number, field: keyof CropData, value: string) => {
    setCrops(crops.map(crop => 
      crop.id === id ? { ...crop, [field]: value } : crop
    ));
    toast.success('Information mise à jour');
  };

  const handleDelete = (id: number) => {
    setCrops(crops.filter(crop => crop.id !== id));
    toast.success('Culture supprimée');
  };

  const handleAdd = () => {
    const newId = Math.max(0, ...crops.map(c => c.id)) + 1;
    setCrops([...crops, {
      id: newId,
      name: 'Nouvelle Culture',
      variety: 'Variété',
      region: 'Région',
      harvestPeriod: 'Période',
      specificNotes: 'Notes spécifiques',
      climateRequirements: 'Besoins climatiques',
      marketInfo: 'Informations de marché'
    }]);
    toast.success('Nouvelle culture ajoutée');
  };

  const handleSelectCrop = (crop: CropData) => {
    setSelectedCrop(crop);
    setShowDetailView(true);
  };

  const handleCloseDetailView = () => {
    setShowDetailView(false);
    setSelectedCrop(null);
  };

  // Conversion correcte des types pour EditableField
  const handleTitleChange = (value: string | number) => {
    setTitle(String(value));
  };

  const handleDescriptionChange = (value: string | number) => {
    setDescription(String(value));
  };

  return (
    <div className="bg-white rounded-xl border p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          <EditableField
            value={title}
            onSave={handleTitleChange}
            className="inline-block"
          />
        </h2>
        <p className="text-muted-foreground">
          <EditableField
            value={description}
            onSave={handleDescriptionChange}
            className="inline-block"
          />
        </p>
      </div>

      {!showDetailView ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Variété</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Période de Récolte</TableHead>
                <TableHead>Notes Spécifiques</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop) => (
                <TableRow key={crop.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSelectCrop(crop)}>
                  <TableCell>
                    <div className="font-medium">{crop.name}</div>
                  </TableCell>
                  <TableCell>{crop.variety}</TableCell>
                  <TableCell>{crop.region}</TableCell>
                  <TableCell>{crop.harvestPeriod}</TableCell>
                  <TableCell className="max-w-xs truncate" title={crop.specificNotes}>
                    {crop.specificNotes}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleSelectCrop(crop)}
                        className="p-1.5 hover:bg-agri-primary/10 text-agri-primary rounded"
                      >
                        <CirclePlus className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(crop.id);
                        }}
                        className="p-1.5 hover:bg-agri-danger/10 text-agri-danger rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4">
            <button 
              onClick={handleAdd}
              className="flex items-center px-4 py-2 text-sm bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une culture
            </button>
          </div>
        </>
      ) : selectedCrop && (
        <div className="animate-fade-in">
          <button 
            onClick={handleCloseDetailView}
            className="mb-4 px-3 py-1.5 text-sm rounded-lg bg-muted hover:bg-muted/80 inline-flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour à la liste
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informations générales</h3>
                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Nom de la culture</label>
                    <EditableField
                      value={selectedCrop.name}
                      onSave={(value) => handleEdit(selectedCrop.id, 'name', value.toString())}
                      className="font-medium text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Variété</label>
                    <EditableField
                      value={selectedCrop.variety}
                      onSave={(value) => handleEdit(selectedCrop.id, 'variety', value.toString())}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Principale région de culture</label>
                    <EditableField
                      value={selectedCrop.region}
                      onSave={(value) => handleEdit(selectedCrop.id, 'region', value.toString())}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Période de récolte</label>
                    <EditableField
                      value={selectedCrop.harvestPeriod}
                      onSave={(value) => handleEdit(selectedCrop.id, 'harvestPeriod', value.toString())}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Besoins climatiques</h3>
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <CloudRain className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                  <EditableField
                    value={selectedCrop.climateRequirements}
                    onSave={(value) => handleEdit(selectedCrop.id, 'climateRequirements', value.toString())}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Notes spécifiques</h3>
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <Carrot className="h-5 w-5 mr-3 text-orange-500 mt-0.5" />
                  <EditableField
                    value={selectedCrop.specificNotes}
                    onSave={(value) => handleEdit(selectedCrop.id, 'specificNotes', value.toString())}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Informations de marché</h3>
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <PlaneTakeoff className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                  <EditableField
                    value={selectedCrop.marketInfo}
                    onSave={(value) => handleEdit(selectedCrop.id, 'marketInfo', value.toString())}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuadeloupeSpecificCrops;
