
import React, { useState } from 'react';
import { Cloud, CloudRain, Umbrella, AlertTriangle, Wind, Thermometer, Edit, Plus, Trash2 } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { EditableField } from './ui/editable-field';
import { toast } from 'sonner';

interface WeatherAlert {
  id: number;
  type: 'cyclone' | 'pluie' | 'secheresse' | 'canicule' | 'vent';
  region: string;
  startDate: string;
  endDate: string;
  description: string;
  severity: 'faible' | 'modérée' | 'élevée' | 'critique';
}

const alertTypeIcons = {
  cyclone: <AlertTriangle className="h-5 w-5 text-red-500" />,
  pluie: <CloudRain className="h-5 w-5 text-blue-500" />,
  secheresse: <Thermometer className="h-5 w-5 text-orange-500" />,
  canicule: <Thermometer className="h-5 w-5 text-red-500" />,
  vent: <Wind className="h-5 w-5 text-teal-500" />
};

const alertSeverityColors = {
  faible: 'bg-emerald-100 text-emerald-800',
  modérée: 'bg-amber-100 text-amber-800',
  élevée: 'bg-orange-100 text-orange-800',
  critique: 'bg-red-100 text-red-800'
};

const GuadeloupeWeatherAlerts = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: 1,
      type: 'cyclone',
      region: 'Toute la Guadeloupe',
      startDate: '2023-09-10',
      endDate: '2023-09-12',
      description: 'Cyclone tropical de catégorie 2 en approche',
      severity: 'critique'
    },
    {
      id: 2,
      type: 'pluie',
      region: 'Basse-Terre',
      startDate: '2023-09-20',
      endDate: '2023-09-23',
      description: 'Fortes précipitations attendues',
      severity: 'modérée'
    },
    {
      id: 3,
      type: 'secheresse',
      region: 'Grande-Terre',
      startDate: '2023-10-01',
      endDate: '2023-10-15',
      description: 'Risque de sécheresse agricole',
      severity: 'élevée'
    }
  ]);

  const [title, setTitle] = useState('Alertes Météorologiques');
  const [description, setDescription] = useState('Suivez les alertes météorologiques impactant l\'agriculture en Guadeloupe');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState<Omit<WeatherAlert, 'id'>>({
    type: 'pluie',
    region: '',
    startDate: '',
    endDate: '',
    description: '',
    severity: 'modérée'
  });

  const handleDelete = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success('Alerte supprimée avec succès');
  };

  const handleAddSubmit = () => {
    if (!newAlert.region || !newAlert.startDate || !newAlert.endDate || !newAlert.description) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const newId = Math.max(0, ...alerts.map(a => a.id)) + 1;
    setAlerts([...alerts, { ...newAlert, id: newId }]);
    setShowAddForm(false);
    toast.success('Nouvelle alerte météo ajoutée');
  };

  // Conversion des handlers pour corriger les erreurs de typage
  const handleTitleChange = (value: string | number) => {
    setTitle(String(value));
  };

  const handleDescriptionChange = (value: string | number) => {
    setDescription(String(value));
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
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
        <button 
          className="flex items-center px-4 py-2 text-sm bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une alerte
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Région</TableHead>
            <TableHead>Période</TableHead>
            <TableHead>Sévérité</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {alertTypeIcons[alert.type]}
                  <span className="ml-2">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</span>
                </div>
              </TableCell>
              <TableCell>
                <EditableField
                  value={alert.region}
                  onSave={(value) => {
                    setAlerts(alerts.map(a => 
                      a.id === alert.id ? { ...a, region: String(value) } : a
                    ));
                  }}
                />
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>
                    <span className="text-xs text-muted-foreground">Début: </span>
                    <EditableField
                      value={alert.startDate}
                      onSave={(value) => {
                        setAlerts(alerts.map(a => 
                          a.id === alert.id ? { ...a, startDate: String(value) } : a
                        ));
                      }}
                      type="text"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Fin: </span>
                    <EditableField
                      value={alert.endDate}
                      onSave={(value) => {
                        setAlerts(alerts.map(a => 
                          a.id === alert.id ? { ...a, endDate: String(value) } : a
                        ));
                      }}
                      type="text"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${alertSeverityColors[alert.severity]}`}>
                  {alert.severity}
                </span>
              </TableCell>
              <TableCell>
                <EditableField
                  value={alert.description}
                  onSave={(value) => {
                    setAlerts(alerts.map(a => 
                      a.id === alert.id ? { ...a, description: String(value) } : a
                    ));
                  }}
                />
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => handleDelete(alert.id)}
                  className="p-1.5 hover:bg-agri-danger/10 text-agri-danger rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Ajouter une alerte météorologique</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type d'alerte</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({...newAlert, type: e.target.value as WeatherAlert['type']})}
                >
                  <option value="cyclone">Cyclone</option>
                  <option value="pluie">Pluie</option>
                  <option value="secheresse">Sécheresse</option>
                  <option value="canicule">Canicule</option>
                  <option value="vent">Vent fort</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Région</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAlert.region}
                  onChange={(e) => setNewAlert({...newAlert, region: e.target.value})}
                  placeholder="Ex: Toute la Guadeloupe, Basse-Terre..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date de début</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border rounded-md"
                    value={newAlert.startDate}
                    onChange={(e) => setNewAlert({...newAlert, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date de fin</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border rounded-md"
                    value={newAlert.endDate}
                    onChange={(e) => setNewAlert({...newAlert, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sévérité</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAlert.severity}
                  onChange={(e) => setNewAlert({...newAlert, severity: e.target.value as WeatherAlert['severity']})}
                >
                  <option value="faible">Faible</option>
                  <option value="modérée">Modérée</option>
                  <option value="élevée">Élevée</option>
                  <option value="critique">Critique</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                  placeholder="Décrivez l'alerte météorologique..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="px-4 py-2 border rounded-md hover:bg-muted/50"
                onClick={() => setShowAddForm(false)}
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 bg-agri-primary text-white rounded-md hover:bg-agri-primary-dark"
                onClick={handleAddSubmit}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuadeloupeWeatherAlerts;
