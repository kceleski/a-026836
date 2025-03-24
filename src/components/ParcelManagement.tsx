
import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Calendar, 
  Filter,
  Plus,
  Search,
  ChevronDown,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';

// Mock data for parcels
const parcelData = [
  { 
    id: 1, 
    name: 'Parcelle Nord', 
    area: 12.5, 
    crop: 'Blé', 
    status: 'active', 
    lastActivity: '2023-08-15', 
    soilType: 'Argileux', 
    coordinates: { lat: 45.4397, lng: 4.3872 }
  },
  { 
    id: 2, 
    name: 'Parcelle Est', 
    area: 8.3, 
    crop: 'Maïs', 
    status: 'active', 
    lastActivity: '2023-08-10', 
    soilType: 'Limoneux', 
    coordinates: { lat: 45.4412, lng: 4.3901 }
  },
  { 
    id: 3, 
    name: 'Parcelle Sud', 
    area: 15.7, 
    crop: 'Tournesol', 
    status: 'active', 
    lastActivity: '2023-08-05', 
    soilType: 'Sableux', 
    coordinates: { lat: 45.4380, lng: 4.3855 }
  },
  { 
    id: 4, 
    name: 'Parcelle Ouest', 
    area: 10.2, 
    crop: 'Orge', 
    status: 'inactive', 
    lastActivity: '2023-07-20', 
    soilType: 'Argileux-Limoneux', 
    coordinates: { lat: 45.4405, lng: 4.3840 }
  },
  { 
    id: 5, 
    name: 'Parcelle Centrale', 
    area: 6.8, 
    crop: 'Luzerne', 
    status: 'planned', 
    lastActivity: '2023-08-01', 
    soilType: 'Limoneux', 
    coordinates: { lat: 45.4390, lng: 4.3885 }
  },
];

// Component for the visual representation of a parcel
const ParcelCard = ({ parcel, onSelect }: { parcel: any, onSelect: (parcel: any) => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-agri-success';
      case 'inactive': return 'bg-agri-danger';
      case 'planned': return 'bg-agri-warning';
      default: return 'bg-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'planned': return 'Planifiée';
      default: return 'Inconnu';
    }
  };

  return (
    <div 
      className="border rounded-xl p-4 bg-white hover:shadow-md transition-shadow cursor-pointer card-hover"
      onClick={() => onSelect(parcel)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{parcel.name}</h3>
        <div className={`flex items-center px-2 py-0.5 rounded-full text-xs ${getStatusColor(parcel.status)} bg-opacity-10 text-foreground`}>
          <span className={`w-2 h-2 rounded-full ${getStatusColor(parcel.status)} mr-1.5`}></span>
          {getStatusLabel(parcel.status)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-3">
        <div className="flex items-center">
          <Layers className="h-4 w-4 mr-1.5" />
          <span>{parcel.area} ha</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1.5" />
          <span>{new Date(parcel.lastActivity).toLocaleDateString()}</span>
        </div>
        <div className="col-span-2 mt-1 py-1 px-2 bg-agri-primary/5 rounded-md text-center">
          <span className="text-agri-primary font-medium">{parcel.crop}</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-2 pt-2 border-t border-border">
        <button className="p-1.5 hover:bg-gray-100 rounded">
          <Edit className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded text-agri-danger">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const ParcelManagement = () => {
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Filter parcels based on search term and filter
  const filteredParcels = parcelData.filter(parcel => {
    const matchesSearch = parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.crop.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && parcel.status === filter;
  });
  
  return (
    <div className="p-6 animate-enter">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Gestion des Parcelles</h1>
          <p className="text-muted-foreground">Gérez et surveillez toutes vos parcelles agricoles</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark transition-colors whitespace-nowrap">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une parcelle
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Parcel List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-10 pr-4 py-2 w-full border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="appearance-none pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tous</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="planned">Planifiée</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
            {filteredParcels.length > 0 ? (
              filteredParcels.map(parcel => (
                <ParcelCard 
                  key={parcel.id} 
                  parcel={parcel} 
                  onSelect={setSelectedParcel} 
                />
              ))
            ) : (
              <div className="text-center py-8 px-4 border border-dashed rounded-lg">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Aucune parcelle trouvée avec ces critères</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Map and Details */}
        <div className="lg:col-span-2">
          {selectedParcel ? (
            <div className="border rounded-xl overflow-hidden h-full">
              <div className="bg-agri-primary text-white p-4">
                <h2 className="text-xl font-semibold">{selectedParcel.name}</h2>
                <p className="text-white/80 text-sm">{selectedParcel.area} hectares - {selectedParcel.soilType}</p>
              </div>
              
              <div className="p-4">
                <div className="bg-muted h-[300px] rounded-lg flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">Carte de la parcelle</p>
                  {/* Here you would integrate a real map like Google Maps, Leaflet, etc. */}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Culture actuelle
                    </h3>
                    <div className="bg-agri-primary/10 rounded-lg p-3 text-center">
                      <span className="font-semibold text-agri-primary">{selectedParcel.crop}</span>
                      <p className="text-sm mt-1">Planté le: 12/03/2023</p>
                      <p className="text-sm">Récolte prévue: 15/09/2023</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Layers className="h-4 w-4 mr-2" />
                      Caractéristiques du sol
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Type:</span>
                        <span className="text-sm font-medium">{selectedParcel.soilType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">pH:</span>
                        <span className="text-sm font-medium">6.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Matière organique:</span>
                        <span className="text-sm font-medium">3.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 md:col-span-2">
                    <h3 className="font-medium mb-3">Historique des cultures</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="text-xs uppercase bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Année</th>
                            <th className="px-4 py-2 text-left">Culture</th>
                            <th className="px-4 py-2 text-left">Rendement</th>
                            <th className="px-4 py-2 text-left">Remarques</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="px-4 py-2">2022</td>
                            <td className="px-4 py-2">Maïs</td>
                            <td className="px-4 py-2">8.2 t/ha</td>
                            <td className="px-4 py-2">Été sec</td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2">2021</td>
                            <td className="px-4 py-2">Blé</td>
                            <td className="px-4 py-2">7.5 t/ha</td>
                            <td className="px-4 py-2">-</td>
                          </tr>
                          <tr className="border-t">
                            <td className="px-4 py-2">2020</td>
                            <td className="px-4 py-2">Colza</td>
                            <td className="px-4 py-2">3.8 t/ha</td>
                            <td className="px-4 py-2">Problèmes d'insectes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border rounded-xl bg-muted h-full flex flex-col items-center justify-center p-6">
              <MapPin className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">Sélectionnez une parcelle</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Cliquez sur une parcelle dans la liste à gauche pour afficher ses détails et accéder à la carte
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParcelManagement;
