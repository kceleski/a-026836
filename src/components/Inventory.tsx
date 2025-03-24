import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  AlertTriangle, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown,
  Edit,
  Trash2,
  ChevronRight,
  X,
  Check,
  BarChart2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for inventory items
const inventoryData = [
  { 
    id: 1, 
    name: 'Semences de blé', 
    category: 'Semences', 
    quantity: 500, 
    unit: 'kg', 
    minQuantity: 100, 
    price: 2.5,
    location: 'Hangar principal',
    lastUpdated: '2023-08-01'
  },
  { 
    id: 2, 
    name: 'Engrais NPK', 
    category: 'Engrais', 
    quantity: 800, 
    unit: 'kg', 
    minQuantity: 200, 
    price: 1.2,
    location: 'Hangar principal',
    lastUpdated: '2023-07-15'
  },
  { 
    id: 3, 
    name: 'Herbicide RoundUp', 
    category: 'Produits phytosanitaires', 
    quantity: 50, 
    unit: 'L', 
    minQuantity: 20, 
    price: 15,
    location: 'Local sécurisé',
    lastUpdated: '2023-08-10'
  },
  { 
    id: 4, 
    name: 'Carburant Diesel', 
    category: 'Carburants', 
    quantity: 350, 
    unit: 'L', 
    minQuantity: 100, 
    price: 1.8,
    location: 'Cuve extérieure',
    lastUpdated: '2023-08-18'
  },
  { 
    id: 5, 
    name: 'Semences de maïs', 
    category: 'Semences', 
    quantity: 80, 
    unit: 'kg', 
    minQuantity: 100, 
    price: 4.5,
    location: 'Hangar principal',
    lastUpdated: '2023-07-22'
  },
  { 
    id: 6, 
    name: 'Huile moteur', 
    category: 'Lubrifiants', 
    quantity: 25, 
    unit: 'L', 
    minQuantity: 10, 
    price: 5.2,
    location: 'Atelier',
    lastUpdated: '2023-06-30'
  },
  { 
    id: 7, 
    name: 'Ficelle pour bottes', 
    category: 'Consommables', 
    quantity: 15, 
    unit: 'rouleaux', 
    minQuantity: 5, 
    price: 25,
    location: 'Hangar matériel',
    lastUpdated: '2023-07-05'
  }
];

// Transaction history data
const transactionHistory = [
  { id: 1, itemId: 1, type: 'out', quantity: 50, date: '2023-08-20', user: 'Jean Dupont', notes: 'Semis parcelle nord' },
  { id: 2, itemId: 2, type: 'out', quantity: 200, date: '2023-08-18', user: 'Jean Dupont', notes: 'Application parcelle est' },
  { id: 3, itemId: 4, type: 'in', quantity: 500, date: '2023-08-18', user: 'Marie Martin', notes: 'Livraison mensuelle' },
  { id: 4, itemId: 3, type: 'out', quantity: 5, date: '2023-08-15', user: 'Jean Dupont', notes: 'Application parcelle sud' },
  { id: 5, itemId: 1, type: 'in', quantity: 200, date: '2023-08-10', user: 'Marie Martin', notes: 'Achat supplémentaire' },
  { id: 6, itemId: 6, type: 'out', quantity: 5, date: '2023-08-05', user: 'Pierre Leroy', notes: 'Vidange tracteur' },
];

// Alerts based on inventory levels
const generateAlerts = () => {
  return inventoryData
    .filter(item => item.quantity <= item.minQuantity)
    .map(item => ({
      id: item.id,
      name: item.name,
      current: item.quantity,
      min: item.minQuantity,
      status: item.quantity < item.minQuantity * 0.5 ? 'critical' : 'warning'
    }));
};

// Stock statistics for visualization
const categoryStats = [
  { name: 'Semences', value: 580, fill: '#4CAF50' },
  { name: 'Engrais', value: 800, fill: '#8D6E63' },
  { name: 'Phytosanitaires', value: 50, fill: '#F44336' },
  { name: 'Carburants', value: 350, fill: '#2196F3' },
  { name: 'Lubrifiants', value: 25, fill: '#FFC107' },
  { name: 'Consommables', value: 15, fill: '#9C27B0' }
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [view, setView] = useState<'list' | 'detail' | 'stats'>('list');
  
  const alerts = generateAlerts();
  
  // Filter and sort inventory items
  const filteredItems = inventoryData
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (categoryFilter === 'all') return matchesSearch;
      return matchesSearch && item.category === categoryFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'quantity') {
        return sortOrder === 'asc' 
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      } else if (sortBy === 'price') {
        return sortOrder === 'asc' 
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });
  
  // Get unique categories for the filter
  const categories = ['all', ...new Set(inventoryData.map(item => item.category))];
  
  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const handleAddTransaction = (type: 'in' | 'out') => {
    console.log(`Add ${type} transaction for item ${selectedItem?.id}`);
    // In a real app, this would open a form to add a transaction
  };
  
  // Get transactions for the selected item
  const itemTransactions = selectedItem 
    ? transactionHistory.filter(t => t.itemId === selectedItem.id).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];
  
  return (
    <div className="p-6 animate-enter">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Gestion des Stocks</h1>
          <p className="text-muted-foreground">Gérez votre inventaire et suivez les niveaux de stock</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'list' 
                ? 'bg-agri-primary text-white' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
            onClick={() => setView('list')}
          >
            Liste
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'stats' 
                ? 'bg-agri-primary text-white' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
            onClick={() => setView('stats')}
          >
            Statistiques
          </button>
          <button 
            className="inline-flex items-center justify-center px-4 py-2 bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark transition-colors whitespace-nowrap ml-2"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un article
          </button>
        </div>
      </header>

      {alerts.length > 0 && (
        <div className="mb-6 border border-agri-warning/30 bg-agri-warning/5 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-agri-warning mr-2" />
            <h3 className="font-medium">Alertes de stock bas</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg border ${
                  alert.status === 'critical' 
                    ? 'border-agri-danger/30 bg-agri-danger/5' 
                    : 'border-agri-warning/30 bg-agri-warning/5'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{alert.name}</p>
                  <span 
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      alert.status === 'critical' 
                        ? 'bg-agri-danger/10 text-agri-danger' 
                        : 'bg-agri-warning/10 text-agri-warning'
                    }`}
                  >
                    {alert.status === 'critical' ? 'Critique' : 'Attention'}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span>Stock actuel: </span>
                  <span className="font-medium">{alert.current}</span>
                  <span className="mx-1">|</span>
                  <span>Minimum: </span>
                  <span className="font-medium">{alert.min}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'list' ? (
        selectedItem ? (
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-agri-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="mr-3 hover:bg-white/10 p-1 rounded"
                >
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAddTransaction('in')}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm flex items-center"
                >
                  <ArrowDown className="h-4 w-4 mr-1.5" />
                  Entrée
                </button>
                <button 
                  onClick={() => handleAddTransaction('out')}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm flex items-center"
                >
                  <ArrowUp className="h-4 w-4 mr-1.5" />
                  Sortie
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Détails de l'article</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Catégorie:</span>
                      <span>{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Quantité:</span>
                      <span className="font-medium">{selectedItem.quantity} {selectedItem.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Seuil minimal:</span>
                      <span>{selectedItem.minQuantity} {selectedItem.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Prix unitaire:</span>
                      <span>{selectedItem.price} €/{selectedItem.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Valeur totale:</span>
                      <span className="font-medium">{(selectedItem.quantity * selectedItem.price).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Emplacement:</span>
                      <span>{selectedItem.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Dernière mise à jour:</span>
                      <span>{new Date(selectedItem.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Statistiques</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Stock actuel', value: selectedItem.quantity },
                          { name: 'Seuil minimal', value: selectedItem.minQuantity }
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} ${selectedItem.unit}`, '']} />
                        <Bar 
                          dataKey="value" 
                          fill={selectedItem.quantity < selectedItem.minQuantity ? '#F44336' : '#4CAF50'} 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Historique des transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Quantité</th>
                        <th className="px-4 py-2 text-left">Utilisateur</th>
                        <th className="px-4 py-2 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemTransactions.map(transaction => (
                        <tr key={transaction.id} className="border-t">
                          <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              transaction.type === 'in' 
                                ? 'bg-agri-success/10 text-agri-success' 
                                : 'bg-agri-warning/10 text-agri-warning'
                            }`}>
                              {transaction.type === 'in' ? (
                                <>
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                  Entrée
                                </>
                              ) : (
                                <>
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                  Sortie
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3">{transaction.quantity} {selectedItem.unit}</td>
                          <td className="px-4 py-3">{transaction.user}</td>
                          <td className="px-4 py-3">{transaction.notes}</td>
                        </tr>
                      ))}
                      {itemTransactions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-4 text-center text-muted-foreground">
                            Aucune transaction pour cet article
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Rechercher un article..." 
                  className="pl-10 pr-4 py-2 w-full border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Toutes catégories' : category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <button 
                          className="flex items-center"
                          onClick={() => toggleSort('name')}
                        >
                          Article
                          {sortBy === 'name' && (
                            sortOrder === 'asc' ? 
                              <ChevronDown className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1 transform rotate-180" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">Catégorie</th>
                      <th className="px-4 py-3 text-left">
                        <button 
                          className="flex items-center"
                          onClick={() => toggleSort('quantity')}
                        >
                          Quantité
                          {sortBy === 'quantity' && (
                            sortOrder === 'asc' ? 
                              <ChevronDown className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1 transform rotate-180" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <button 
                          className="flex items-center"
                          onClick={() => toggleSort('price')}
                        >
                          Prix unitaire
                          {sortBy === 'price' && (
                            sortOrder === 'asc' ? 
                              <ChevronDown className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1 transform rotate-180" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">Valeur totale</th>
                      <th className="px-4 py-3 text-left">Statut</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr 
                        key={item.id} 
                        className="border-t hover:bg-muted/30 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">{item.category}</td>
                        <td className="px-4 py-3">{item.quantity} {item.unit}</td>
                        <td className="px-4 py-3">{item.price} €/{item.unit}</td>
                        <td className="px-4 py-3">{(item.quantity * item.price).toFixed(2)} €</td>
                        <td className="px-4 py-3">
                          {item.quantity <= item.minQuantity ? (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              item.quantity < item.minQuantity * 0.5 
                                ? 'bg-agri-danger/10 text-agri-danger' 
                                : 'bg-agri-warning/10 text-agri-warning'
                            }`}>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {item.quantity < item.minQuantity * 0.5 ? 'Critique' : 'Bas'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-success/10 text-agri-success">
                              <Check className="h-3 w-3 mr-1" />
                              Normal
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddTransaction('in');
                              }}
                              className="p-1.5 hover:bg-agri-success/10 text-agri-success rounded"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddTransaction('out');
                              }}
                              className="p-1.5 hover:bg-agri-warning/10 text-agri-warning rounded"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit
                              }}
                              className="p-1.5 hover:bg-muted rounded"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-4 text-center text-muted-foreground">
                          Aucun article trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Répartition par catégorie</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} unités`, 'Quantité']} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]} 
                    fill="#4CAF50" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Valeur du stock par catégorie</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryStats.map(cat => {
                    // Find all items in this category
                    const items = inventoryData.filter(item => item.category === cat.name);
                    // Calculate total value
                    const value = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
                    return { ...cat, value };
                  })}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => {
                    // Check if value is a number before using toFixed
                    return [typeof value === 'number' ? `${value.toFixed(2)} €` : `${value} €`, 'Valeur'];
                  }} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]} 
                    fill="#4CAF50"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-6 lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Articles les plus coûteux</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 text-left">Article</th>
                    <th className="px-4 py-2 text-left">Catégorie</th>
                    <th className="px-4 py-2 text-left">Prix unitaire</th>
                    <th className="px-4 py-2 text-left">Quantité</th>
                    <th className="px-4 py-2 text-left">Valeur totale</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData
                    .sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price))
                    .slice(0, 5)
                    .map(item => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-2 font-medium">{item.name}</td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">{item.price} €/{item.unit}</td>
                        <td className="px-4 py-2">{item.quantity} {item.unit}</td>
                        <td className="px-4 py-2 font-medium">{(item.quantity * item.price).toFixed(2)} €</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ajouter un article</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de l'article</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Nom de l'article"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Catégorie</label>
                <select className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Sélectionner une catégorie</option>
                  {categories
                    .filter(c => c !== 'all')
                    .map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))
                  }
                  <option value="new">+ Nouvelle catégorie</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantité</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unité</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="kg, L, unités..."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prix unitaire (€)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Seuil minimal</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Emplacement</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Emplacement de stockage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Notes supplémentaires..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm text-foreground bg-muted rounded-md hover:bg-muted/80"
                >
                  Annuler
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 text-sm text-white bg-agri-primary rounded-md hover:bg-agri-primary-dark"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
