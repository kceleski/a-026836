
import React, { useState } from 'react';
import { EditableField } from './ui/editable-field';
import { Plus, Edit, Trash2, CirclePlus, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Culture {
  id: number;
  name: string;
  variety: string;
  region: string;
  harvestPeriod: string;
  specificNotes: string;
  yieldPerHectare?: string;
  soilType?: string;
  waterNeeds?: string;
  plantingDepth?: string;
  rowSpacing?: string;
  marketValue?: string;
  plantingTime?: string;
  growthDuration?: string;
  pestResistance?: string;
  diseaseResistance?: string;
  fertilizationNeeds?: string;
  storageConditions?: string;
}

export const CultureDetailTable = () => {
  const [cultures, setCultures] = useState<Culture[]>([
    {
      id: 1,
      name: "Canne à Sucre",
      variety: "R579",
      region: "Grande-Terre",
      harvestPeriod: "Février-Juin",
      specificNotes: "Résistante à la sécheresse et à fort rendement",
      yieldPerHectare: "80-100 tonnes/ha",
      soilType: "Sols argileux profonds",
      waterNeeds: "1500-2000mm/an",
      plantingDepth: "20-25cm",
      rowSpacing: "1.5m",
      marketValue: "45-50€/tonne",
      plantingTime: "Juin-Août",
      growthDuration: "12-14 mois",
      pestResistance: "Moyenne",
      diseaseResistance: "Bonne",
      fertilizationNeeds: "NPK 15-15-15, 800kg/ha",
      storageConditions: "Transformation rapide après récolte"
    },
    {
      id: 2,
      name: "Banane",
      variety: "Poyo",
      region: "Basse-Terre",
      harvestPeriod: "Toute l'année",
      specificNotes: "Adaptée aux sols volcaniques, sensible aux cyclones",
      yieldPerHectare: "30-40 tonnes/ha",
      soilType: "Sols volcaniques riches",
      waterNeeds: "2000-2500mm/an",
      plantingDepth: "30-40cm",
      rowSpacing: "2m",
      marketValue: "0.90-1.20€/kg",
      plantingTime: "Toute l'année",
      growthDuration: "9-12 mois",
      pestResistance: "Faible",
      diseaseResistance: "Moyenne",
      fertilizationNeeds: "Riche en potassium, 600kg/ha",
      storageConditions: "10-12°C, 85-90% d'humidité"
    }
  ]);

  const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null);

  const handleUpdate = (id: number, field: keyof Culture, value: string) => {
    setCultures(cultures.map(culture => 
      culture.id === id ? { ...culture, [field]: value } : culture
    ));
    toast.success("Information mise à jour");
  };

  const handleDelete = (id: number) => {
    setCultures(cultures.filter(culture => culture.id !== id));
    toast.success("Culture supprimée");
  };

  const handleAdd = () => {
    const newCulture: Culture = {
      id: cultures.length > 0 ? Math.max(...cultures.map(c => c.id)) + 1 : 1,
      name: "Nouvelle Culture",
      variety: "Variété",
      region: "Région",
      harvestPeriod: "Période",
      specificNotes: "Notes spécifiques",
    };
    setCultures([...cultures, newCulture]);
    toast.success("Nouvelle culture ajoutée");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cultures Spécifiques de la Guadeloupe</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une culture
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Variété</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Période de Récolte</TableHead>
              <TableHead>Notes Spécifiques</TableHead>
              <TableHead>Rendement/ha</TableHead>
              <TableHead>Type de Sol</TableHead>
              <TableHead>Besoins en Eau</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cultures.map((culture) => (
              <TableRow key={culture.id} className="border-t hover:bg-muted/30">
                <TableCell>
                  <EditableField
                    value={culture.name}
                    onSave={(value) => handleUpdate(culture.id, 'name', String(value))}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.variety}
                    onSave={(value) => handleUpdate(culture.id, 'variety', String(value))}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.region}
                    onSave={(value) => handleUpdate(culture.id, 'region', String(value))}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.harvestPeriod}
                    onSave={(value) => handleUpdate(culture.id, 'harvestPeriod', String(value))}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.specificNotes}
                    onSave={(value) => handleUpdate(culture.id, 'specificNotes', String(value))}
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.yieldPerHectare || ''}
                    onSave={(value) => handleUpdate(culture.id, 'yieldPerHectare', String(value))}
                    placeholder="Rendement/ha"
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.soilType || ''}
                    onSave={(value) => handleUpdate(culture.id, 'soilType', String(value))}
                    placeholder="Type de sol"
                  />
                </TableCell>
                <TableCell>
                  <EditableField
                    value={culture.waterNeeds || ''}
                    onSave={(value) => handleUpdate(culture.id, 'waterNeeds', String(value))}
                    placeholder="Besoins en eau"
                  />
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <button 
                        className="p-1.5 hover:bg-agri-primary/10 text-agri-primary rounded flex items-center"
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Détails
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Détails complets de la culture: {culture.name}</DialogTitle>
                        <DialogDescription>
                          Toutes les informations techniques de la culture.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Profondeur de plantation</h3>
                            <EditableField
                              value={culture.plantingDepth || ''}
                              onSave={(value) => handleUpdate(culture.id, 'plantingDepth', String(value))}
                              placeholder="Profondeur de plantation"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Espacement des rangs</h3>
                            <EditableField
                              value={culture.rowSpacing || ''}
                              onSave={(value) => handleUpdate(culture.id, 'rowSpacing', String(value))}
                              placeholder="Espacement des rangs"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Valeur marchande</h3>
                            <EditableField
                              value={culture.marketValue || ''}
                              onSave={(value) => handleUpdate(culture.id, 'marketValue', String(value))}
                              placeholder="Valeur marchande"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Période de plantation</h3>
                            <EditableField
                              value={culture.plantingTime || ''}
                              onSave={(value) => handleUpdate(culture.id, 'plantingTime', String(value))}
                              placeholder="Période de plantation"
                              className="text-base"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Durée de croissance</h3>
                            <EditableField
                              value={culture.growthDuration || ''}
                              onSave={(value) => handleUpdate(culture.id, 'growthDuration', String(value))}
                              placeholder="Durée de croissance"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Résistance aux ravageurs</h3>
                            <EditableField
                              value={culture.pestResistance || ''}
                              onSave={(value) => handleUpdate(culture.id, 'pestResistance', String(value))}
                              placeholder="Résistance aux ravageurs"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Résistance aux maladies</h3>
                            <EditableField
                              value={culture.diseaseResistance || ''}
                              onSave={(value) => handleUpdate(culture.id, 'diseaseResistance', String(value))}
                              placeholder="Résistance aux maladies"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Besoins en fertilisation</h3>
                            <EditableField
                              value={culture.fertilizationNeeds || ''}
                              onSave={(value) => handleUpdate(culture.id, 'fertilizationNeeds', String(value))}
                              placeholder="Besoins en fertilisation"
                              className="text-base"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Conditions de stockage</h3>
                            <EditableField
                              value={culture.storageConditions || ''}
                              onSave={(value) => handleUpdate(culture.id, 'storageConditions', String(value))}
                              placeholder="Conditions de stockage"
                              className="text-base"
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDelete(culture.id)}
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
      </div>
    </div>
  );
};
