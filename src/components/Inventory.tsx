import React, { useState, useRef } from 'react';
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
  BarChart2,
  Save,
  Upload,
  Download,
  FileUp,
  FileDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EditableField } from './ui/editable-field';
import { EditableTable, Column } from './ui/editable-table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';
import ConfirmDialog from './inventory/ConfirmDialog';
import { exportInventoryToCSV, importInventoryFromCSV } from './inventory/ImportExportFunctions';

// Mock data for inventory items
const initialInventoryData = [
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
const initialTransactionHistory = [
  { id: 1, itemId: 1, type: 'out', quantity: 50, date: '2023-08-20', user: 'Jean Dupont', notes: 'Semis parcelle nord' },
  { id: 2, itemId: 2, type: 'out', quantity: 200, date: '2023-08-18', user: 'Jean Dupont', notes: 'Application parcelle est' },
  { id: 3, itemId: 4, type: 'in', quantity: 500, date: '2023-08-18', user: 'Marie Martin', notes: 'Livraison mensuelle' },
  { id: 4, itemId: 3, type: 'out', quantity: 5, date: '2023-08-15', user: 'Jean Dupont', notes: 'Application parcelle sud' },
  { id: 5, itemId: 1, type: 'in', quantity: 200, date: '2023-08-10', user: 'Marie Martin', notes: 'Achat supplémentaire' },
  { id: 6, itemId: 6, type: 'out', quantity: 5, date: '2023-08-05', user: 'Pierre Leroy', notes: 'Vidange tracteur' },
];

// Stock statistics for visualization
const initialCategoryStats = [
  { name: 'Semences', value: 580, fill: '#4CAF50' },
  { name: 'Engrais', value: 800, fill: '#8D6E63' },
  { name: 'Phytosanitaires', value: 50, fill: '#F44336' },
  { name: 'Carburants', value: 350, fill: '#2196F3' },
  { name: 'Lubrifiants', value: 25, fill: '#FFC107' },
  { name: 'Consommables', value: 15, fill: '#9C27B0' }
];

const Inventory = () => {
  const { toast: shadowToast } = useToast();
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [transactionHistory, setTransactionHistory] = useState(initialTransactionHistory);
  const [categoryStats, setCategoryStats] = useState(initialCategoryStats);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    minQuantity: 0,
    price: 0,
    location: '',
    notes: ''
  });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [view, setView] = useState<'list' | 'detail' | 'stats'>('list');
  const [showTransactionForm, setShowTransactionForm] = useState<'in' | 'out' | null>(null);
  const [newTransaction, setNewTransaction] = useState({
    quantity: 0,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  // New state for confirmation dialogs
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
  const [transactionDeleteConfirmOpen, setTransactionDeleteConfirmOpen] = useState(false);
  
  // File input ref for CSV import
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    if (!field) return;
    
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Add new import/export handlers
  const handleExportData = () => {
    exportInventoryToCSV(inventoryData);
  };
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    importInventoryFromCSV(file, (importedData) => {
      // Option 1: Replace all inventory data
      // setInventoryData(importedData);
      
      // Option 2: Merge with existing data (avoiding duplicates by ID)
      const existingIds = new Set(inventoryData.map(item => item.id));
      const newItems = importedData.filter(item => !existingIds.has(item.id));
      const updatedItems = importedData.filter(item => existingIds.has(item.id));
      
      // Update existing items
      const updatedInventory = inventoryData.map(item => {
        const updatedItem = updatedItems.find(update => update.id === item.id);
        return updatedItem || item;
      });
      
      // Add new items
      setInventoryData([...updatedInventory, ...newItems]);
      
      // Update category stats
      updateCategoryStats([...updatedInventory, ...newItems]);
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const updateCategoryStats = (items: typeof inventoryData) => {
    const categories: Record<string, number> = {};
    const colors: Record<string, string> = {};
    
    // Get existing colors
    categoryStats.forEach(stat => {
      colors[stat.name] = stat.fill;
    });
    
    // Calculate new quantities by category
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = 0;
        if (!colors[item.category]) {
          colors[item.category] = getRandomColor();
        }
      }
      categories[item.category] += item.quantity;
    });
    
    // Create new stats array
    const newStats = Object.entries(categories).map(([name, value]) => ({
      name,
      value,
      fill: colors[name]
    }));
    
    setCategoryStats(newStats);
  };
  
  // Modified delete handlers to use confirmation dialog
  const confirmDeleteItem = (id: number) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };
  
  const handleDeleteItem = () => {
    if (itemToDelete === null) return;
    
    const itemToDeleteObj = inventoryData.find(item => item.id === itemToDelete);
    if (!itemToDeleteObj) return;
    
    setInventoryData(inventoryData.filter(item => item.id !== itemToDelete));
    
    // Update category stats
    setCategoryStats(categoryStats.map(stat => 
      stat.name === itemToDeleteObj.category 
        ? { ...stat, value: Math.max(0, stat.value - itemToDeleteObj.quantity) }
        : stat
    ));
    
    // If the deleted item is selected, clear selection
    if (selectedItem && selectedItem.id === itemToDelete) {
      setSelectedItem(null);
    }
    
    toast.success(`${itemToDeleteObj.name} a été supprimé de l'inventaire`);
    setItemToDelete(null);
    setDeleteConfirmOpen(false);
  };
  
  const confirmDeleteTransaction = (id: number) => {
    setTransactionToDelete(id);
    setTransactionDeleteConfirmOpen(true);
  };
  
  const handleDeleteTransaction = () => {
    if (transactionToDelete === null || !selectedItem) return;
    
    const transaction = transactionHistory.find(t => t.id === transactionToDelete);
    if (!transaction) return;
    
    // Remove transaction
    const updatedTransactions = transactionHistory.filter(t => t.id !== transactionToDelete);
    setTransactionHistory(updatedTransactions);
    
    // Adjust item quantity
    const quantityChange = transaction.type === 'in' 
      ? -transaction.quantity 
      : transaction.quantity;
    
    handleUpdateItem(
      selectedItem.id, 
      'quantity', 
      Math.max(0, selectedItem.quantity + quantityChange)
    );
    
    toast.success("Transaction supprimée et stock ajusté");
    setTransactionToDelete(null);
    setTransactionDeleteConfirmOpen(false);
  };
  
  // Add new inventory item
  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.unit) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const newId = Math.max(...inventoryData.map(item => item.id), 0) + 1;
    const itemToAdd = {
      ...newItem,
      id: newId,
      lastUpdated: new Date().toISOString().split('T')[0],
      quantity: Number(newItem.quantity),
      minQuantity: Number(newItem.minQuantity),
      price: Number(newItem.price)
    };
    
    setInventoryData([...inventoryData, itemToAdd]);
    
    // Update category stats
    const existingCategoryStat = categoryStats.find(stat => stat.name === newItem.category);
    if (existingCategoryStat) {
      setCategoryStats(categoryStats.map(stat => 
        stat.name === newItem.category 
          ? { ...stat, value: stat.value + Number(newItem.quantity) }
          : stat
      ));
    } else {
      setCategoryStats([...categoryStats, { 
        name: newItem.category, 
        value: Number(newItem.quantity),
        fill: getRandomColor()
      }]);
    }
    
    setShowAddForm(false);
    setNewItem({
      name: '',
      category: '',
      quantity: 0,
      unit: '',
      minQuantity: 0,
      price: 0,
      location: '',
      notes: ''
    });
    
    toast.success(`${newItem.name} a été ajouté à l'inventaire`);
  };
  
  // Generate a random color for new categories
  const getRandomColor = () => {
    const colors = ['#4CAF50', '#8D6E63', '#F44336', '#2196F3', '#FFC107', '#9C27B0', '#FF5722', '#3F51B5'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Update an inventory item
  const handleUpdateItem = (id: number, field: string, value: any) => {
    setInventoryData(inventoryData.map(item => {
      if (item.id !== id) return item;
      
      const updatedItem = { 
        ...item, 
        [field]: value,
        lastUpdated: new Date().toISOString().split('T')[0] 
      };
      
      // If the updated item is selected, update selection
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(updatedItem);
      }
      
      return updatedItem;
    }));
    
    // If quantity field is updated, update category stats
    if (field === 'quantity') {
      const item = inventoryData.find(item => item.id === id);
      if (item) {
        const oldQuantity = item.quantity;
        const newQuantity = value;
        const diff = newQuantity - oldQuantity;
        
        setCategoryStats(categoryStats.map(stat => 
          stat.name === item.category 
            ? { ...stat, value: stat.value + diff }
            : stat
        ));
      }
    }
  };
  
  // Add transaction
  const handleAddTransaction = (type: 'in' | 'out') => {
    setShowTransactionForm(type);
  };
  
  // Submit transaction
  const handleSubmitTransaction = () => {
    if (!selectedItem || !showTransactionForm || newTransaction.quantity <= 0) {
      toast.error("Veuillez spécifier une quantité valide");
      return;
    }
    
    // Create new transaction
    const newId = Math.max(...transactionHistory.map(t => t.id), 0) + 1;
    const transaction = {
      id: newId,
      itemId: selectedItem.id,
      type: showTransactionForm,
      quantity: newTransaction.quantity,
      date: newTransaction.date,
      user: 'Utilisateur actuel', // In a real app, this would be the current user
      notes: newTransaction.notes
    };
    
    setTransactionHistory([transaction, ...transactionHistory]);
    
    // Update item quantity
    const updatedQuantity = showTransactionForm === 'in' 
      ? selectedItem.quantity + newTransaction.quantity 
      : Math.max(0, selectedItem.quantity - newTransaction.quantity);
    
    handleUpdateItem(selectedItem.id, 'quantity', updatedQuantity);
    
    setShowTransactionForm(null);
    setNewTransaction({
      quantity: 0,
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    toast.success(`${newTransaction.quantity} ${selectedItem.unit} ${showTransactionForm === 'in' ? 'ajoutés' : 'retirés'} de l'inventaire`);
  };
  
  // Get transactions for the selected item
  const itemTransactions = selectedItem 
    ? transactionHistory.filter(t => t.itemId === selectedItem.id).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  // Column definitions for the inventory table
  const inventoryColumns: Column[] = [
    { id: 'name', header: 'Article', accessorKey: 'name', isEditable: true },
    { id: 'category', header: 'Catégorie', accessorKey: 'category', isEditable: true },
    { id: 'quantity', header: 'Quantité', accessorKey: 'quantity', type: 'number', isEditable: true },
    { id: 'price', header: 'Prix unitaire', accessorKey: 'price', type: 'number', isEditable: true },
    { id: 'value', header: 'Valeur totale', accessorKey: 'value', type: 'text', isEditable: false },
    { id: 'status', header: 'Statut', accessorKey: 'status', type: 'text', isEditable: false },
  ];

  // Prepare data for EditableTable
  const tableData = filteredItems.map(item => ({
    ...item,
    value: `${(item.quantity * item.price).toFixed(2)} €`,
    status: item.quantity <= item.minQuantity 
      ? item.quantity < item.minQuantity * 0.5 ? 'critical' : 'warning'
      : 'normal'
  }));

  // Handle row updates in the EditableTable
  const handleTableUpdate = (rowIndex: number, columnId: string, value: any) => {
    const item = filteredItems[rowIndex];
    if (!item) return;
    
    handleUpdateItem(item.id, columnId, value);
  };
  
  // Add keyboard accessibility handling
  const handleKeyDown = (e: React.KeyboardEvent, action: Function) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };
  
  return (
    <div className="animate-enter">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Gestion des Stocks</h1>
          <p className="text-muted-foreground">Gérez votre inventaire et suivez les niveaux de stock</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
            className="px-4 py-2"
          >
            Liste
          </Button>
          <Button 
            variant={view === 'stats' ? 'default' : 'outline'}
            onClick={() => setView('stats')}
            className="px-4 py-2"
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Statistiques
          </Button>
          <Button 
            variant="outline"
            onClick={handleExportData}
            className="px-4 py-2"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <div className="relative">
            <Button 
              variant="outline"
              onClick={handleImportClick}
              className="px-4 py-2"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".csv"
              className="hidden" 
            />
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="ml-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un article
          </Button>
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
                  <EditableField
                    value={alert.current}
                    type="number"
                    onSave={(value) => handleUpdateItem(alert.id, 'quantity', Number(value))}
                    className="inline-block"
                  />
                  <span className="mx-1">|</span>
                  <span>Minimum: </span>
                  <EditableField
                    value={alert.min}
                    type="number"
                    onSave={(value) => handleUpdateItem(alert.id, 'minQuantity', Number(value))}
                    className="inline-block"
                  />
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
                  aria-label="Retour à la liste"
                >
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <EditableField 
                  value={selectedItem.name}
                  onSave={(value) => handleUpdateItem(selectedItem.id, 'name', value)}
                  className="text-xl font-semibold"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => handleAddTransaction('in')}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-none"
                >
                  <ArrowDown className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Entrée</span>
                </Button>
                <Button 
                  onClick={() => handleAddTransaction('out')}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-none"
                >
                  <ArrowUp className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Sortie</span>
                </Button>
                <Button 
                  onClick={() => confirmDeleteItem(selectedItem.id)}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-none"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  <span className="hidden sm:inline">Supprimer</span>
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium mb-3">Détails de l'article</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Catégorie:</span>
                      <EditableField
                        value={selectedItem.category}
                        onSave={(value) => handleUpdateItem(selectedItem.id, 'category', value)}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Quantité:</span>
                      <div className="flex items-center">
                        <EditableField
                          value={selectedItem.quantity}
                          type="number"
                          onSave={(value) => handleUpdateItem(selectedItem.id, 'quantity', Number(value))}
                          className="font-medium"
                        />
                        <EditableField
                          value={selectedItem.unit}
                          onSave={(value) => handleUpdateItem(selectedItem.id, 'unit', value)}
                          className="ml-1"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Seuil minimal:</span>
                      <div className="flex items-center">
                        <EditableField
                          value={selectedItem.minQuantity}
                          type="number"
                          onSave={(value) => handleUpdateItem(selectedItem.id, 'minQuantity', Number(value))}
                        />
                        <span className="ml-1">{selectedItem.unit}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Prix unitaire:</span>
                      <div className="flex items-center">
                        <EditableField
                          value={selectedItem.price}
                          type="number"
                          onSave={(value) => handleUpdateItem(selectedItem.id, 'price', Number(value))}
                        />
                        <span className="ml-1">€/{selectedItem.unit}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Valeur totale:</span>
                      <span className="font-medium">{(selectedItem.quantity * selectedItem.price).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Emplacement:</span>
                      <EditableField
                        value={selectedItem.location}
                        onSave={(value) => handleUpdateItem(selectedItem.id, 'location', value)}
                      />
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
                        margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} ${selectedItem.unit}`, '']} />
                        <Bar 
                          dataKey="value" 
                          fill="#4CAF50" 
                          radius={[4, 4, 0, 0]}
                          fillOpacity={1}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {showTransactionForm && (
                <div className="mb-6 p-4 border rounded-lg bg-muted/10">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">
                      {showTransactionForm === 'in' ? 'Nouvelle entrée' : 'Nouvelle sortie'}
                    </h3>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowTransactionForm(null)}
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantité</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="quantity"
                          type="number"
                          value={newTransaction.quantity}
                          onChange={(e) => setNewTransaction({
                            ...newTransaction,
                            quantity: parseInt(e.target.value) || 0
                          })}
                          min={0}
                        />
                        <span className="ml-2">{selectedItem.unit}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({
                          ...newTransaction,
                          date: e.target.value
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Input
                        id="notes"
                        value={newTransaction.notes}
                        onChange={(e) => setNewTransaction({
                          ...newTransaction,
                          notes: e.target.value
                        })}
                        placeholder="Commentaire..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowTransactionForm(null)}
                      className="mr-2"
                    >
                      Annuler
                    </Button>
                    <Button onClick={handleSubmitTransaction}>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Historique des transactions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Quantité</th>
                        <th className="px-4 py-2 text-left">Utilisateur</th>
                        <th className="px-4 py-2 text-left">Notes</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemTransactions.map((transaction) => (
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
                          <td className="px-4 py-3">
                            <EditableField
                              value={transaction.notes}
                              onSave={(value) => {
                                const updatedTransactions = [...transactionHistory];
                                const index = updatedTransactions.findIndex(t => t.id === transaction.id);
                                if (index !== -1) {
                                  updatedTransactions[index].notes = value.toString();
                                  setTransactionHistory(updatedTransactions);
                                }
                              }}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => confirmDeleteTransaction(transaction.id)}
                              className="text-agri-danger"
                              aria-label="Supprimer la transaction"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {itemTransactions.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-4 text-center text-muted-foreground">
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
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Rechercher un article..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="h-10 appearance-none pl-3 pr-8 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filtrer par catégorie"
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

            <EditableTable
              data={tableData}
              columns={inventoryColumns}
              onUpdate={handleTableUpdate}
              onDelete={(rowIndex) => {
                const item = filteredItems[rowIndex];
                if (item) confirmDeleteItem(item.id);
              }}
              sortable={true}
              className="mb-6"
            />
          </>
        )
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Répartition par catégorie</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryStats}
                  margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={70}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4CAF50" radius={[4, 4, 0, 0]} fillOpacity={1} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Valeur totale de l'inventaire</h3>
              <p className="text-3xl font-bold">
                {inventoryData.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)} €
              </p>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Nombre d'articles</h3>
              <p className="text-3xl font-bold">{inventoryData.length}</p>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Articles à réapprovisionner</h3>
              <p className="text-3xl font-bold">{alerts.length}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ajouter un nouvel article</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="name" className="mb-1">Nom de l'article*</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Nom de l'article"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="mb-1">Catégorie*</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    placeholder="Catégorie"
                    list="categories"
                  />
                  <datalist id="categories">
                    {[...new Set(inventoryData.map(item => item.category))].map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
                
                <div>
                  <Label htmlFor="quantity" className="mb-1">Quantité</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                    min="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit" className="mb-1">Unité*</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    placeholder="kg, L, pièces..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="minQuantity" className="mb-1">Quantité minimale</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={newItem.minQuantity}
                    onChange={(e) => setNewItem({...newItem, minQuantity: Number(e.target.value)})}
                    min="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price" className="mb-1">Prix unitaire</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="mb-1">Emplacement</Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    placeholder="Emplacement de stockage"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="notes" className="mb-1">Notes</Label>
                <Textarea
                  id="notes"
                  value={newItem.notes}
                  onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  placeholder="Notes supplémentaires..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleAddItem}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Supprimer cet article"
        description="Êtes-vous sûr de vouloir supprimer cet article de l'inventaire ? Cette action ne peut pas être annulée."
        onConfirm={handleDeleteItem}
        variant="destructive"
      />
      
      <ConfirmDialog
        open={transactionDeleteConfirmOpen}
        onOpenChange={setTransactionDeleteConfirmOpen}
        title="Supprimer cette transaction"
        description="Êtes-vous sûr de vouloir supprimer cette transaction ? Le stock sera ajusté en conséquence."
        onConfirm={handleDeleteTransaction}
        variant="destructive"
      />
    </div>
  );
};

export default Inventory;
