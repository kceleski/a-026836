
import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  Trash2,
  Edit,
  Download,
  Printer,
  BarChart2,
  LineChart,
  PieChart,
  ChevronRight,
  X,
  Check,
  FileText
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock data for financial transactions
const transactionsData = [
  { 
    id: 1, 
    date: '2023-08-20', 
    description: 'Vente de blé', 
    amount: 2500, 
    type: 'income', 
    category: 'Ventes', 
    paymentMethod: 'Virement',
    reference: 'FAC-2023-001'
  },
  { 
    id: 2, 
    date: '2023-08-18', 
    description: 'Achat d\'engrais', 
    amount: -800, 
    type: 'expense', 
    category: 'Intrants', 
    paymentMethod: 'Carte bancaire',
    reference: 'ACH-2023-042'
  },
  { 
    id: 3, 
    date: '2023-08-15', 
    description: 'Carburant tracteur', 
    amount: -180, 
    type: 'expense', 
    category: 'Carburant', 
    paymentMethod: 'Carte bancaire',
    reference: 'ACH-2023-043'
  },
  { 
    id: 4, 
    date: '2023-08-10', 
    description: 'Vente de maïs', 
    amount: 1800, 
    type: 'income', 
    category: 'Ventes', 
    paymentMethod: 'Virement',
    reference: 'FAC-2023-002'
  },
  { 
    id: 5, 
    date: '2023-08-05', 
    description: 'Réparation moissonneuse', 
    amount: -450, 
    type: 'expense', 
    category: 'Réparations', 
    paymentMethod: 'Chèque',
    reference: 'ACH-2023-044'
  },
  { 
    id: 6, 
    date: '2023-08-01', 
    description: 'Assurance exploitation', 
    amount: -350, 
    type: 'expense', 
    category: 'Assurances', 
    paymentMethod: 'Prélèvement',
    reference: 'ASS-2023-008'
  },
  { 
    id: 7, 
    date: '2023-07-28', 
    description: 'Subvention PAC', 
    amount: 3500, 
    type: 'income', 
    category: 'Subventions', 
    paymentMethod: 'Virement',
    reference: 'SUB-2023-001'
  },
];

// Monthly summary data
const monthlySummary = [
  { month: 'Jan', income: 5200, expenses: 3800 },
  { month: 'Fév', income: 4500, expenses: 3200 },
  { month: 'Mar', income: 6800, expenses: 4100 },
  { month: 'Avr', income: 7200, expenses: 5300 },
  { month: 'Mai', income: 8500, expenses: 4900 },
  { month: 'Juin', income: 9100, expenses: 5200 },
  { month: 'Juil', income: 7800, expenses: 4800 },
  { month: 'Août', income: 6300, expenses: 3900 }
];

// Category breakdown data
const expensesByCategory = [
  { name: 'Intrants', value: 2500, color: '#4CAF50' },
  { name: 'Carburant', value: 1200, color: '#8D6E63' },
  { name: 'Réparations', value: 800, color: '#F44336' },
  { name: 'Assurances', value: 700, color: '#2196F3' },
  { name: 'Salaires', value: 1500, color: '#FFC107' },
  { name: 'Autres', value: 500, color: '#9C27B0' }
];

const incomeByCategory = [
  { name: 'Ventes blé', value: 4500, color: '#4CAF50' },
  { name: 'Ventes maïs', value: 3800, color: '#8D6E63' },
  { name: 'Ventes légumes', value: 1200, color: '#F44336' },
  { name: 'Subventions', value: 3500, color: '#2196F3' },
  { name: 'Prestations', value: 800, color: '#FFC107' }
];

// Cash flow projection data
const cashFlowProjection = [
  { month: 'Sep', income: 4800, expenses: 3200, balance: 1600 },
  { month: 'Oct', income: 5200, expenses: 3800, balance: 1400 },
  { month: 'Nov', income: 4500, expenses: 2900, balance: 1600 },
  { month: 'Déc', income: 6700, expenses: 4100, balance: 2600 },
  { month: 'Jan', income: 3900, expenses: 3500, balance: 400 },
  { month: 'Fév', income: 3200, expenses: 2800, balance: 400 }
];

const FinancialTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [view, setView] = useState<'transactions' | 'dashboard'>('transactions');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  
  // Calculate summary statistics
  const totalIncome = transactionsData
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactionsData
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Filter transactions based on search and filters
  const filteredTransactions = transactionsData
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesDateFilter = true;
      if (dateFilter === 'thisMonth') {
        const transactionDate = new Date(transaction.date);
        const currentDate = new Date();
        matchesDateFilter = transactionDate.getMonth() === currentDate.getMonth() &&
                          transactionDate.getFullYear() === currentDate.getFullYear();
      } else if (dateFilter === 'lastMonth') {
        const transactionDate = new Date(transaction.date);
        const currentDate = new Date();
        const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
        const lastMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
        matchesDateFilter = transactionDate.getMonth() === lastMonth &&
                          transactionDate.getFullYear() === lastMonthYear;
      }
      
      const matchesTypeFilter = typeFilter === 'all' || transaction.type === typeFilter;
      
      return matchesSearch && matchesDateFilter && matchesTypeFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'amount') {
        return sortOrder === 'asc' 
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });
  
  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Calculate monthly totals
  const currentMonthIncome = transactionsData
    .filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      return t.type === 'income' &&
             transactionDate.getMonth() === currentDate.getMonth() &&
             transactionDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  const currentMonthExpenses = transactionsData
    .filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      return t.type === 'expense' &&
             transactionDate.getMonth() === currentDate.getMonth() &&
             transactionDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  return (
    <div className="p-6 animate-enter">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Gestion Financière</h1>
          <p className="text-muted-foreground">Suivez vos finances et analysez votre rentabilité</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'transactions' 
                ? 'bg-agri-primary text-white' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
            onClick={() => setView('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'dashboard' 
                ? 'bg-agri-primary text-white' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
            onClick={() => setView('dashboard')}
          >
            Tableau de bord
          </button>
          <button 
            className="inline-flex items-center justify-center px-4 py-2 bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark transition-colors whitespace-nowrap ml-2"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle transaction
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-agri-success/10 flex items-center justify-center mr-4">
            <ArrowDownLeft className="h-6 w-6 text-agri-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Revenus</p>
            <p className="text-2xl font-semibold">{totalIncome.toLocaleString()} €</p>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci: {currentMonthIncome.toLocaleString()} €
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-agri-danger/10 flex items-center justify-center mr-4">
            <ArrowUpRight className="h-6 w-6 text-agri-danger" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dépenses</p>
            <p className="text-2xl font-semibold">{totalExpenses.toLocaleString()} €</p>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci: {currentMonthExpenses.toLocaleString()} €
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-4 flex items-center">
          <div className={`w-12 h-12 rounded-full ${
            balance >= 0 ? 'bg-agri-primary/10' : 'bg-agri-danger/10'
          } flex items-center justify-center mr-4`}>
            <Wallet className={`h-6 w-6 ${
              balance >= 0 ? 'text-agri-primary' : 'text-agri-danger'
            }`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Solde</p>
            <p className="text-2xl font-semibold">{balance.toLocaleString()} €</p>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci: {(currentMonthIncome - currentMonthExpenses).toLocaleString()} €
            </p>
          </div>
        </div>
      </div>

      {view === 'transactions' ? (
        selectedTransaction ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="bg-agri-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="mr-3 hover:bg-white/10 p-1 rounded"
                >
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <h2 className="text-xl font-semibold">Détails de la transaction</h2>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-white/10 rounded">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Informations générales</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Description:</span>
                        <span className="font-medium">{selectedTransaction.description}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{new Date(selectedTransaction.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Montant:</span>
                        <span className={`font-medium ${
                          selectedTransaction.type === 'income' ? 'text-agri-success' : 'text-agri-danger'
                        }`}>
                          {selectedTransaction.type === 'income' ? '+' : '-'}
                          {Math.abs(selectedTransaction.amount).toLocaleString()} €
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium capitalize">{
                          selectedTransaction.type === 'income' ? 'Revenu' : 'Dépense'
                        }</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Catégorie:</span>
                        <span className="font-medium">{selectedTransaction.category}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Moyen de paiement:</span>
                        <span className="font-medium">{selectedTransaction.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Référence:</span>
                        <span className="font-medium">{selectedTransaction.reference}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Documents associés</h3>
                    <div className="text-center py-6">
                      <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Aucun document associé</p>
                      <button className="mt-3 px-4 py-2 border border-dashed rounded-lg text-sm hover:bg-muted/80">
                        Ajouter un document
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Notes</h3>
                    <textarea 
                      className="w-full p-3 border border-input rounded-md bg-white"
                      placeholder="Ajouter des notes sur cette transaction..."
                      rows={4}
                    />
                    <button className="mt-2 px-3 py-1.5 bg-agri-primary text-white rounded-md text-sm">
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Rechercher une transaction..." 
                  className="pl-10 pr-4 py-2 w-full border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">Toutes dates</option>
                    <option value="thisMonth">Ce mois-ci</option>
                    <option value="lastMonth">Mois dernier</option>
                  </select>
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Tous types</option>
                    <option value="income">Revenus</option>
                    <option value="expense">Dépenses</option>
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <button 
                          className="flex items-center"
                          onClick={() => toggleSort('date')}
                        >
                          Date
                          {sortBy === 'date' && (
                            sortOrder === 'asc' ? 
                              <ChevronDown className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1 transform rotate-180" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-left">Catégorie</th>
                      <th className="px-4 py-3 text-left">
                        <button 
                          className="flex items-center"
                          onClick={() => toggleSort('amount')}
                        >
                          Montant
                          {sortBy === 'amount' && (
                            sortOrder === 'asc' ? 
                              <ChevronDown className="h-4 w-4 ml-1" /> : 
                              <ChevronDown className="h-4 w-4 ml-1 transform rotate-180" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">Référence</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(transaction => (
                      <tr 
                        key={transaction.id} 
                        className="border-t hover:bg-muted/30 cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <td className="px-4 py-3 font-medium">{new Date(transaction.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">{transaction.description}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100">
                            {transaction.category}
                          </span>
                        </td>
                        <td className={`px-4 py-3 font-medium ${
                          transaction.type === 'income' ? 'text-agri-success' : 'text-agri-danger'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {Math.abs(transaction.amount).toLocaleString()} €
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{transaction.reference}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center space-x-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit
                              }}
                              className="p-1.5 hover:bg-muted rounded"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                              }}
                              className="p-1.5 hover:bg-muted rounded text-agri-danger"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                          Aucune transaction trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-input bg-white rounded-lg hover:bg-muted/30 transition-colors">
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </button>
            </div>
          </>
        )
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Revenus vs. Dépenses</h3>
                <div className="flex space-x-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-agri-success rounded-full mr-1"></div>
                    <span className="text-xs">Revenus</span>
                  </div>
                  <div className="flex items-center ml-3">
                    <div className="w-3 h-3 bg-agri-danger rounded-full mr-1"></div>
                    <span className="text-xs">Dépenses</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySummary}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value.toLocaleString()} €`, '']}
                      itemSorter={(item) => -item.value}
                    />
                    <Bar dataKey="income" name="Revenus" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Dépenses" fill="#F44336" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Projection de trésorerie</h3>
                <div className="flex space-x-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-agri-primary rounded-full mr-1"></div>
                    <span className="text-xs">Solde</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={cashFlowProjection}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value.toLocaleString()} €`, '']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      name="Revenus" 
                      stroke="#4CAF50" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      name="Dépenses" 
                      stroke="#F44336" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      name="Solde" 
                      stroke="#4CAF50" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Répartition des dépenses</h3>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} €`, 'Montant']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-medium mb-4">Répartition des revenus</h3>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={incomeByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {incomeByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} €`, 'Montant']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-medium mb-4">Indicateurs financiers clés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Marge brute</p>
                <p className="text-2xl font-semibold">{(totalIncome * 0.65).toLocaleString()} €</p>
                <p className="text-xs text-agri-success">65% du revenu</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Marge nette</p>
                <p className="text-2xl font-semibold">{(totalIncome * 0.35).toLocaleString()} €</p>
                <p className="text-xs text-agri-success">35% du revenu</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Coût de production</p>
                <p className="text-2xl font-semibold">185 €/t</p>
                <p className="text-xs text-muted-foreground">Moyenne toutes cultures</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ajouter une transaction</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-muted/20">
                    <input type="radio" name="transactionType" value="income" className="mr-2" />
                    <ArrowDownLeft className="h-4 w-4 text-agri-success mr-2" />
                    <span>Revenu</span>
                  </label>
                  <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-muted/20">
                    <input type="radio" name="transactionType" value="expense" className="mr-2" />
                    <ArrowUpRight className="h-4 w-4 text-agri-danger mr-2" />
                    <span>Dépense</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Description de la transaction"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Montant (€)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Catégorie</label>
                <select className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Sélectionner une catégorie</option>
                  <option value="ventes">Ventes</option>
                  <option value="subventions">Subventions</option>
                  <option value="autres_revenus">Autres revenus</option>
                  <option value="intrants">Intrants</option>
                  <option value="carburant">Carburant</option>
                  <option value="reparations">Réparations</option>
                  <option value="assurances">Assurances</option>
                  <option value="salaires">Salaires</option>
                  <option value="autres_depenses">Autres dépenses</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Moyen de paiement</label>
                <select className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Sélectionner un moyen de paiement</option>
                  <option value="virement">Virement</option>
                  <option value="carte">Carte bancaire</option>
                  <option value="cheque">Chèque</option>
                  <option value="especes">Espèces</option>
                  <option value="prelevement">Prélèvement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Référence</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Numéro de facture ou référence"
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

export default FinancialTracking;
