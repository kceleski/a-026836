
import React, { useState, useEffect } from 'react';
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
  FileText,
  Euro
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
import { EditableField } from './ui/editable-field';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from "@/hooks/use-toast";

// Transaction type definition
export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  paymentMethod: string;
  reference: string;
  notes?: string;
}

// Mock data for financial transactions
const initialTransactionsData: Transaction[] = [
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

// Category options for dropdowns
const categoryOptions = [
  { value: 'Ventes', label: 'Ventes' },
  { value: 'Subventions', label: 'Subventions' },
  { value: 'Intrants', label: 'Intrants' },
  { value: 'Carburant', label: 'Carburant' },
  { value: 'Réparations', label: 'Réparations' },
  { value: 'Assurances', label: 'Assurances' },
  { value: 'Salaires', label: 'Salaires' },
  { value: 'Autres revenus', label: 'Autres revenus' },
  { value: 'Autres dépenses', label: 'Autres dépenses' }
];

// Payment method options
const paymentMethodOptions = [
  { value: 'Virement', label: 'Virement' },
  { value: 'Carte bancaire', label: 'Carte bancaire' },
  { value: 'Chèque', label: 'Chèque' },
  { value: 'Espèces', label: 'Espèces' },
  { value: 'Prélèvement', label: 'Prélèvement' }
];

const FinancialTracking = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [view, setView] = useState<'transactions' | 'dashboard'>('transactions');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>(initialTransactionsData);
  const [isEditingTransaction, setIsEditingTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    type: 'income',
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: '',
    category: '',
    paymentMethod: '',
    reference: ''
  });
  const [transactionNotes, setTransactionNotes] = useState('');
  
  // Calculate summary statistics
  const totalIncome = transactionsData
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const totalExpenses = transactionsData
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Filter transactions based on search and filters
  const filteredTransactions = transactionsData
    .filter(transaction => {
      const matchesSearch = 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const currentMonthExpenses = transactionsData
    .filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      return t.type === 'expense' &&
             transactionDate.getMonth() === currentDate.getMonth() &&
             transactionDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  // Handle adding a new transaction
  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const amount = newTransaction.type === 'expense' 
      ? -Math.abs(Number(newTransaction.amount)) 
      : Math.abs(Number(newTransaction.amount));

    const newTransactionComplete: Transaction = {
      id: Math.max(0, ...transactionsData.map(t => t.id)) + 1,
      date: newTransaction.date || new Date().toISOString().split('T')[0],
      description: newTransaction.description || '',
      amount: amount,
      type: newTransaction.type || 'income',
      category: newTransaction.category || '',
      paymentMethod: newTransaction.paymentMethod || '',
      reference: newTransaction.reference || '',
      notes: newTransaction.notes
    };

    setTransactionsData([newTransactionComplete, ...transactionsData]);
    setShowAddForm(false);
    
    // Reset form
    setNewTransaction({
      type: 'income',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      description: '',
      category: '',
      paymentMethod: '',
      reference: ''
    });

    toast({
      title: "Transaction ajoutée",
      description: "La transaction a été ajoutée avec succès",
      variant: "default"
    });
  };

  // Handle updating a transaction
  const handleUpdateTransaction = (field: keyof Transaction, value: any) => {
    if (!selectedTransaction) return;

    const updatedTransaction = { ...selectedTransaction, [field]: value };
    
    // If type changes, adjust the amount sign
    if (field === 'type') {
      updatedTransaction.amount = value === 'expense' 
        ? -Math.abs(selectedTransaction.amount) 
        : Math.abs(selectedTransaction.amount);
    }
    
    // If we're directly updating the amount, ensure it has the correct sign
    if (field === 'amount') {
      updatedTransaction.amount = selectedTransaction.type === 'expense' 
        ? -Math.abs(Number(value)) 
        : Math.abs(Number(value));
    }

    setSelectedTransaction(updatedTransaction);

    if (!isEditingTransaction) {
      // Update the transaction in the main data
      const updatedTransactions = transactionsData.map(t => 
        t.id === selectedTransaction.id ? updatedTransaction : t
      );
      
      setTransactionsData(updatedTransactions);
      
      // Show a toast notification
      toast({
        title: "Transaction mise à jour",
        description: `${updatedTransaction.description} a été mise à jour`,
        variant: "default"
      });
    }
  };

  // Handle saving all changes to a transaction
  const handleSaveAllChanges = () => {
    if (!selectedTransaction) return;
    
    const updatedTransactions = transactionsData.map(t => 
      t.id === selectedTransaction.id ? selectedTransaction : t
    );
    
    setTransactionsData(updatedTransactions);
    setIsEditingTransaction(false);
    
    toast({
      title: "Modifications enregistrées",
      description: "Toutes les modifications ont été enregistrées",
      variant: "default"
    });
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (id: number) => {
    const transactionToDelete = transactionsData.find(t => t.id === id);
    if (!transactionToDelete) return;

    // Show confirmation dialog
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la transaction "${transactionToDelete.description}" ?`)) {
      const updatedTransactions = transactionsData.filter(t => t.id !== id);
      setTransactionsData(updatedTransactions);
      
      if (selectedTransaction?.id === id) {
        setSelectedTransaction(null);
      }
      
      toast({
        title: "Transaction supprimée",
        description: `${transactionToDelete.description} a été supprimée`,
        variant: "default"
      });
    }
  };

  // Handle saving notes
  const handleSaveNotes = () => {
    if (!selectedTransaction) return;
    
    const updatedTransaction = { ...selectedTransaction, notes: transactionNotes };
    
    // Update the transaction in the main data
    const updatedTransactions = transactionsData.map(t => 
      t.id === selectedTransaction.id ? updatedTransaction : t
    );
    
    setTransactionsData(updatedTransactions);
    setSelectedTransaction(updatedTransaction);
    
    toast({
      title: "Notes enregistrées",
      description: "Les notes ont été enregistrées",
      variant: "default"
    });
  };

  // Set transaction notes when selected transaction changes
  useEffect(() => {
    if (selectedTransaction?.notes) {
      setTransactionNotes(selectedTransaction.notes);
    } else {
      setTransactionNotes('');
    }
  }, [selectedTransaction]);

  // Handle exporting data
  const handleExport = () => {
    // Create a CSV string
    const headers = ['Date', 'Description', 'Catégorie', 'Montant', 'Type', 'Méthode de paiement', 'Référence'];
    const csvRows = [headers.join(',')];
    
    transactionsData.forEach(transaction => {
      const row = [
        transaction.date,
        `"${transaction.description.replace(/"/g, '""')}"`,
        transaction.category,
        transaction.amount,
        transaction.type === 'income' ? 'Revenu' : 'Dépense',
        transaction.paymentMethod,
        transaction.reference
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    
    // Create a download link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions_financieres.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export réussi",
      description: "Les données ont été exportées avec succès",
      variant: "default"
    });
  };

  return (
    <div className="p-6 animate-enter">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Gestion Financière</h1>
          <p className="text-muted-foreground">Suivez vos finances et analysez votre rentabilité</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={view === 'transactions' ? 'default' : 'outline'}
            onClick={() => setView('transactions')}
          >
            Transactions
          </Button>
          <Button 
            variant={view === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setView('dashboard')}
          >
            Tableau de bord
          </Button>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="ml-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle transaction
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-agri-success/10 flex items-center justify-center mr-4">
            <ArrowDownLeft className="h-6 w-6 text-agri-success" />
          </div>
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">Revenus</p>
            <EditableField
              value={totalIncome}
              type="number"
              onSave={(value) => {
                toast({
                  title: "Fonctionnalité limitée",
                  description: "La modification directe du total des revenus n'est pas disponible.",
                  variant: "default"
                })
              }}
              className="text-2xl font-semibold"
              inputClassName="text-xl font-semibold"
              icon={<Euro className="h-4 w-4" />}
            />
            <p className="text-xs text-muted-foreground">
              Ce mois-ci: {currentMonthIncome.toLocaleString()} €
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-agri-danger/10 flex items-center justify-center mr-4">
            <ArrowUpRight className="h-6 w-6 text-agri-danger" />
          </div>
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">Dépenses</p>
            <EditableField
              value={totalExpenses}
              type="number"
              onSave={(value) => {
                toast({
                  title: "Fonctionnalité limitée",
                  description: "La modification directe du total des dépenses n'est pas disponible.",
                  variant: "default"
                })
              }}
              className="text-2xl font-semibold"
              inputClassName="text-xl font-semibold"
              icon={<Euro className="h-4 w-4" />}
            />
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
          <div className="flex-grow">
            <p className="text-sm text-muted-foreground">Solde</p>
            <EditableField
              value={balance}
              type="number"
              onSave={(value) => {
                toast({
                  title: "Fonctionnalité limitée",
                  description: "La modification directe du solde n'est pas disponible.",
                  variant: "default"
                })
              }}
              className="text-2xl font-semibold"
              inputClassName="text-xl font-semibold"
              icon={<Euro className="h-4 w-4" />}
            />
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
                  onClick={() => {
                    if (isEditingTransaction) {
                      if (window.confirm("Annuler les modifications ?")) {
                        setIsEditingTransaction(false);
                        setSelectedTransaction(transactionsData.find(t => t.id === selectedTransaction.id) || null);
                      }
                    } else {
                      setSelectedTransaction(null);
                    }
                  }}
                  className="mr-3 hover:bg-white/10 p-1 rounded"
                >
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <h2 className="text-xl font-semibold">Détails de la transaction</h2>
              </div>
              <div className="flex space-x-2">
                {isEditingTransaction ? (
                  <>
                    <Button
                      onClick={handleSaveAllChanges}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Enregistrer
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingTransaction(false);
                        setSelectedTransaction(transactionsData.find(t => t.id === selectedTransaction.id) || null);
                      }}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsEditingTransaction(true)}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      onClick={() => handleDeleteTransaction(selectedTransaction.id)}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </>
                )}
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
                        <EditableField
                          value={selectedTransaction.description}
                          onSave={(value) => handleUpdateTransaction('description', value)}
                          className="font-medium text-right"
                          showEditIcon={true}
                        />
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Date:</span>
                        <EditableField
                          value={selectedTransaction.date}
                          type="date"
                          onSave={(value) => handleUpdateTransaction('date', value)}
                          className="font-medium text-right"
                          showEditIcon={true}
                        />
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Montant:</span>
                        <EditableField
                          value={Math.abs(selectedTransaction.amount)}
                          type="number"
                          onSave={(value) => handleUpdateTransaction('amount', value)}
                          className={`font-medium text-right ${
                            selectedTransaction.type === 'income' ? 'text-agri-success' : 'text-agri-danger'
                          }`}
                          showEditIcon={true}
                        />
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Type:</span>
                        <EditableField
                          value={selectedTransaction.type}
                          type="select"
                          options={[
                            { value: 'income', label: 'Revenu' },
                            { value: 'expense', label: 'Dépense' }
                          ]}
                          onSave={(value) => handleUpdateTransaction('type', value)}
                          className="font-medium text-right capitalize"
                          showEditIcon={true}
                        />
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Catégorie:</span>
                        <EditableField
                          value={selectedTransaction.category}
                          type="select"
                          options={categoryOptions}
                          onSave={(value) => handleUpdateTransaction('category', value)}
                          className="font-medium text-right"
                          showEditIcon={true}
                        />
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Moyen de paiement:</span>
                        <EditableField
                          value={selectedTransaction.paymentMethod}
                          type="select"
                          options={paymentMethodOptions}
                          onSave={(value) => handleUpdateTransaction('paymentMethod', value)}
                          className="font-medium text-right"
                          showEditIcon={true}
                        />
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Référence:</span>
                        <EditableField
                          value={selectedTransaction.reference}
                          onSave={(value) => handleUpdateTransaction('reference', value)}
                          className="font-medium text-right"
                          showEditIcon={true}
                        />
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
                      value={transactionNotes}
                      onChange={(e) => setTransactionNotes(e.target.value)}
                    />
                    <Button 
                      onClick={handleSaveNotes}
                      size="sm"
                      className="mt-2"
                    >
                      Enregistrer
                    </Button>
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
                <Input
                  type="text" 
                  placeholder="Rechercher une transaction..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white h-10"
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
                    className="appearance-none pl-3 pr-8 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white h-10"
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
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
                      </TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>
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
                      </TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map(transaction => (
                      <TableRow 
                        key={transaction.id} 
                        className="cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100">
                            {transaction.category}
                          </span>
                        </TableCell>
                        <TableCell className={`font-medium ${
                          transaction.type === 'income' ? 'text-agri-success' : 'text-agri-danger'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {Math.abs(transaction.amount).toLocaleString()} €
                        </TableCell>
                        <TableCell className="text-muted-foreground">{transaction.reference}</TableCell>
                        <TableCell>
                          <div className="flex justify-center space-x-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTransaction(transaction);
                                setIsEditingTransaction(true);
                              }}
                              className="p-1.5 hover:bg-muted rounded"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTransaction(transaction.id);
                              }}
                              className="p-1.5 hover:bg-muted rounded text-agri-danger"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          Aucune transaction trouvée
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  toast({
                    title: "Impression",
                    description: "Fonctionnalité d'impression lancée",
                    variant: "default"
                  });
                  window.print();
                }}
              >
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
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
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleAddTransaction();
            }}>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-muted/20">
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="income" 
                      className="mr-2"
                      checked={newTransaction.type === 'income'}
                      onChange={() => setNewTransaction({...newTransaction, type: 'income'})}
                    />
                    <ArrowDownLeft className="h-4 w-4 text-agri-success mr-2" />
                    <span>Revenu</span>
                  </label>
                  <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-muted/20">
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="expense" 
                      className="mr-2"
                      checked={newTransaction.type === 'expense'}
                      onChange={() => setNewTransaction({...newTransaction, type: 'expense'})}
                    />
                    <ArrowUpRight className="h-4 w-4 text-agri-danger mr-2" />
                    <span>Dépense</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input 
                  type="text" 
                  placeholder="Description de la transaction"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Montant (€)</label>
                  <Input 
                    type="number" 
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={newTransaction.amount || ''}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input 
                    type="date" 
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Catégorie</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md h-10"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Moyen de paiement</label>
                <select 
                  className="w-full px-3 py-2 border border-input rounded-md h-10"
                  value={newTransaction.paymentMethod}
                  onChange={(e) => setNewTransaction({...newTransaction, paymentMethod: e.target.value})}
                >
                  <option value="">Sélectionner un moyen de paiement</option>
                  {paymentMethodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Référence</label>
                <Input 
                  type="text" 
                  placeholder="Numéro de facture ou référence"
                  value={newTransaction.reference || ''}
                  onChange={(e) => setNewTransaction({...newTransaction, reference: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Notes supplémentaires..."
                  rows={3}
                  value={newTransaction.notes || ''}
                  onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                >
                  Ajouter
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialTracking;
