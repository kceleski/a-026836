
import React, { useState } from 'react';
import { CloudRain, AlertTriangle, Sun, Wind, Calendar, ArrowUpRight, Trash2, Plus, X, Save, CloudLightning } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { EditableField } from './ui/editable-field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeatherAlert {
  id: number;
  type: 'storm' | 'hurricane' | 'drought' | 'flood' | 'heatwave';
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  areas: string[];
  recommendations: string;
  status: 'active' | 'resolved' | 'monitoring';
}

const GuadeloupeWeatherAlerts = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('Alertes Météo en Guadeloupe');
  const [description, setDescription] = useState('Système de surveillance et gestion des alertes météorologiques');
  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: 1,
      type: 'hurricane',
      title: 'Alerte Cyclone - Vigilance Orange',
      description: 'Un cyclone tropical de catégorie 2 approche des côtes de la Guadeloupe.',
      startDate: '2023-09-15',
      endDate: '2023-09-18',
      severity: 'high',
      areas: ['Basse-Terre', 'Grande-Terre', 'Marie-Galante'],
      recommendations: 'Sécurisez vos équipements agricoles. Renforcez les structures. Mettez le bétail à l\'abri.',
      status: 'resolved'
    },
    {
      id: 2,
      type: 'drought',
      title: 'Alerte Sécheresse - Nord Grande-Terre',
      description: 'Période de sécheresse prolongée affectant les cultures dans le nord de Grande-Terre.',
      startDate: '2023-06-01',
      endDate: '2023-08-30',
      severity: 'medium',
      areas: ['Nord Grande-Terre'],
      recommendations: 'Rationnez l\'eau d\'irrigation. Priorisez les cultures essentielles. Utilisez du paillage pour maintenir l\'humidité du sol.',
      status: 'resolved'
    },
    {
      id: 3,
      type: 'flood',
      title: 'Risque d\'Inondation - Sud Basse-Terre',
      description: 'Fortes pluies attendues pouvant causer des inondations dans les régions basses.',
      startDate: '2024-05-10',
      severity: 'medium',
      areas: ['Sud Basse-Terre', 'Capesterre'],
      recommendations: 'Dégagez les canaux d\'irrigation. Surveillez les niveaux d\'eau. Surélevez les équipements électriques.',
      status: 'active'
    },
    {
      id: 4,
      type: 'heatwave',
      title: 'Vague de Chaleur - Est Grande-Terre',
      description: 'Températures anormalement élevées prévues pendant plusieurs jours.',
      startDate: '2024-04-20',
      endDate: '2024-04-25',
      severity: 'low',
      areas: ['Est Grande-Terre', 'La Désirade'],
      recommendations: 'Arrosez les cultures tôt le matin ou tard le soir. Installez des ombrages temporaires. Augmentez la fréquence d\'irrigation.',
      status: 'monitoring'
    }
  ]);
  
  const [selectedAlert, setSelectedAlert] = useState<WeatherAlert | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAlert, setEditedAlert] = useState<WeatherAlert | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Handlers
  const handleTitleChange = (value: string | number) => {
    setTitle(String(value));
  };
  
  const handleDescriptionChange = (value: string | number) => {
    setDescription(String(value));
  };
  
  const handleSelectAlert = (alert: WeatherAlert) => {
    setSelectedAlert(alert);
    setIsEditing(false);
  };
  
  const handleStartEdit = (alert: WeatherAlert | null = null) => {
    if (alert) {
      setEditedAlert({...alert});
      setSelectedAlert(alert);
    } else {
      // Créer une nouvelle alerte
      const newAlert: WeatherAlert = {
        id: Math.max(0, ...alerts.map(a => a.id)) + 1,
        type: 'storm',
        title: 'Nouvelle alerte',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        severity: 'medium',
        areas: ['Guadeloupe'],
        recommendations: '',
        status: 'active'
      };
      setEditedAlert(newAlert);
      setSelectedAlert(null);
    }
    setIsEditing(true);
  };
  
  const handleEditChange = (field: keyof WeatherAlert, value: any) => {
    if (!editedAlert) return;
    
    if (field === 'areas') {
      // Convertir la chaîne en tableau
      const areasArray = String(value).split(',').map(area => area.trim());
      setEditedAlert({...editedAlert, areas: areasArray});
    } else {
      setEditedAlert({...editedAlert, [field]: value});
    }
  };
  
  const handleSaveAlert = () => {
    if (!editedAlert) return;
    
    if (alerts.some(a => a.id === editedAlert.id)) {
      // Mise à jour
      setAlerts(alerts.map(a => a.id === editedAlert.id ? editedAlert : a));
      setSelectedAlert(editedAlert);
      toast({
        title: "Alerte mise à jour",
        description: "Les modifications ont été enregistrées avec succès"
      });
    } else {
      // Nouvelle alerte
      setAlerts([...alerts, editedAlert]);
      setSelectedAlert(editedAlert);
      toast({
        title: "Nouvelle alerte créée",
        description: "L'alerte a été ajoutée au système"
      });
    }
    
    setIsEditing(false);
    setEditedAlert(null);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedAlert(null);
  };
  
  const handleDeleteAlert = (alertId: number) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert(null);
    }
    toast({
      title: "Alerte supprimée",
      description: "L'alerte a été supprimée du système"
    });
  };
  
  // Filtrer les alertes
  const filteredAlerts = alerts.filter(alert => {
    if (filterStatus === 'all') return true;
    return alert.status === filterStatus;
  });
  
  // Obtenir l'icône du type d'alerte
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'hurricane':
        return <Wind className="h-5 w-5 text-red-500" />;
      case 'drought':
        return <Sun className="h-5 w-5 text-amber-500" />;
      case 'flood':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'storm':
        return <CloudLightning className="h-5 w-5 text-purple-500" />;
      case 'heatwave':
        return <Sun className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Obtenir la classe pour la sévérité
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'extreme':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Obtenir la classe pour le statut
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'monitoring':
        return 'bg-amber-100 text-amber-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <CloudLightning className="h-6 w-6 mr-2 text-amber-500" />
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
        
        <div className="flex flex-col md:flex-row">
          {/* Liste des alertes */}
          <div className="w-full md:w-2/5 p-4 border-r md:max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Tabs value={filterStatus} onValueChange={setFilterStatus} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">Toutes</TabsTrigger>
                  <TabsTrigger value="active" className="flex-1">Actives</TabsTrigger>
                  <TabsTrigger value="monitoring" className="flex-1">Surveillance</TabsTrigger>
                  <TabsTrigger value="resolved" className="flex-1">Résolues</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <Button 
              onClick={() => handleStartEdit()} 
              className="w-full mb-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle alerte
            </Button>
            
            <div className="space-y-3">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-3 border rounded-lg cursor-pointer transition hover:bg-muted/50 ${selectedAlert?.id === alert.id ? 'border-primary bg-muted/30' : ''}`}
                    onClick={() => handleSelectAlert(alert)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        {getAlertIcon(alert.type)}
                        <span className="font-medium ml-2">{alert.title}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(alert.status)}`}>
                        {alert.status === 'active' ? 'Active' : 
                          alert.status === 'monitoring' ? 'Surveillance' : 'Résolue'}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {alert.description}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(alert.startDate).toLocaleDateString()}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityClass(alert.severity)}`}>
                        {alert.severity === 'low' ? 'Faible' : 
                          alert.severity === 'medium' ? 'Moyenne' : 
                          alert.severity === 'high' ? 'Élevée' : 'Extrême'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Aucune alerte trouvée</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Détails de l'alerte */}
          <div className="w-full md:w-3/5 p-6">
            {isEditing ? (
              // Formulaire d'édition
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {editedAlert?.id && alerts.some(a => a.id === editedAlert.id) ? 
                      'Modifier l\'alerte' : 'Nouvelle alerte'}
                  </h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button size="sm" onClick={handleSaveAlert}>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre</label>
                    <Input 
                      value={editedAlert?.title || ''}
                      onChange={(e) => handleEditChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select 
                      className="w-full h-10 px-3 py-2 border rounded-md"
                      value={editedAlert?.type || 'storm'}
                      onChange={(e) => handleEditChange('type', e.target.value)}
                    >
                      <option value="storm">Tempête</option>
                      <option value="hurricane">Cyclone</option>
                      <option value="drought">Sécheresse</option>
                      <option value="flood">Inondation</option>
                      <option value="heatwave">Vague de chaleur</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date de début</label>
                    <Input 
                      type="date"
                      value={editedAlert?.startDate || ''}
                      onChange={(e) => handleEditChange('startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date de fin (optionnelle)</label>
                    <Input 
                      type="date"
                      value={editedAlert?.endDate || ''}
                      onChange={(e) => handleEditChange('endDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sévérité</label>
                    <select 
                      className="w-full h-10 px-3 py-2 border rounded-md"
                      value={editedAlert?.severity || 'medium'}
                      onChange={(e) => handleEditChange('severity', e.target.value)}
                    >
                      <option value="low">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Élevée</option>
                      <option value="extreme">Extrême</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut</label>
                    <select 
                      className="w-full h-10 px-3 py-2 border rounded-md"
                      value={editedAlert?.status || 'active'}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="monitoring">Surveillance</option>
                      <option value="resolved">Résolue</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Zones concernées (séparées par des virgules)</label>
                    <Input 
                      value={editedAlert?.areas?.join(', ') || ''}
                      onChange={(e) => handleEditChange('areas', e.target.value)}
                      placeholder="Basse-Terre, Grande-Terre, Marie-Galante"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      rows={3}
                      value={editedAlert?.description || ''}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Recommandations</label>
                    <Textarea 
                      rows={3}
                      value={editedAlert?.recommendations || ''}
                      onChange={(e) => handleEditChange('recommendations', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : selectedAlert ? (
              // Affichage des détails
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    {getAlertIcon(selectedAlert.type)}
                    <h3 className="text-xl font-semibold ml-2">{selectedAlert.title}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleStartEdit(selectedAlert)}>
                      Modifier
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteAlert(selectedAlert.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(selectedAlert.status)} mr-2`}>
                    {selectedAlert.status === 'active' ? 'Active' : 
                      selectedAlert.status === 'monitoring' ? 'Surveillance' : 'Résolue'}
                  </span>
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getSeverityClass(selectedAlert.severity)}`}>
                    Sévérité: {selectedAlert.severity === 'low' ? 'Faible' : 
                      selectedAlert.severity === 'medium' ? 'Moyenne' : 
                      selectedAlert.severity === 'high' ? 'Élevée' : 'Extrême'}
                  </span>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <p className="text-muted-foreground">{selectedAlert.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Période</h4>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Du {new Date(selectedAlert.startDate).toLocaleDateString()}
                        {selectedAlert.endDate && ` au ${new Date(selectedAlert.endDate).toLocaleDateString()}`}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Zones concernées</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedAlert.areas.map((area, index) => (
                        <span key={index} className="inline-block bg-muted px-2 py-1 rounded text-xs">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2 text-amber-800">Recommandations</h4>
                  <p className="text-amber-700">{selectedAlert.recommendations}</p>
                </div>
              </div>
            ) : (
              // Aucune alerte sélectionnée
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <AlertTriangle className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune alerte sélectionnée</h3>
                <p className="text-muted-foreground mb-6">
                  Sélectionnez une alerte dans la liste ou créez-en une nouvelle
                </p>
                <Button onClick={() => handleStartEdit()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une alerte
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuadeloupeWeatherAlerts;
