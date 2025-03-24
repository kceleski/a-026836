
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Sprout, 
  CloudRain, 
  Sun,
  Droplet,
  Wind,
  ArrowRight,
  Calendar,
  Wallet
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample data for charts
const revenueData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Fév', revenue: 1900 },
  { month: 'Mar', revenue: 2100 },
  { month: 'Avr', revenue: 2400 },
  { month: 'Mai', revenue: 2800 },
  { month: 'Juin', revenue: 3200 },
  { month: 'Juil', revenue: 3800 },
];

const productionData = [
  { name: 'Blé', value: 35 },
  { name: 'Maïs', value: 25 },
  { name: 'Légumes', value: 20 },
  { name: 'Fruits', value: 15 },
  { name: 'Autre', value: 5 },
];

// Weather forecast mock data
const weatherForecast = [
  { day: 'Lun', temp: 22, icon: Sun, condition: 'Ensoleillé' },
  { day: 'Mar', temp: 21, icon: CloudRain, condition: 'Pluvieux' },
  { day: 'Mer', temp: 19, icon: Wind, condition: 'Venteux' },
  { day: 'Jeu', temp: 23, icon: Sun, condition: 'Ensoleillé' },
  { day: 'Ven', temp: 24, icon: Sun, condition: 'Ensoleillé' },
];

// Task list mock data
const upcomingTasks = [
  { id: 1, title: 'Récolter le blé', due: 'Aujourd\'hui', priority: 'high' },
  { id: 2, title: 'Commander des semences', due: 'Demain', priority: 'medium' },
  { id: 3, title: 'Maintenance du tracteur', due: '28/08', priority: 'low' },
  { id: 4, title: 'Irrigation des parcelles', due: '30/08', priority: 'medium' },
];

// Alerts mock data
const alerts = [
  { id: 1, message: 'Niveau bas de semences de maïs', type: 'warning' },
  { id: 2, message: 'Risque de pluie pour demain', type: 'info' },
  { id: 3, message: 'Échéance de paiement approche', type: 'danger' },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-enter">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Bonjour, Agriculteur</h1>
          <p className="text-muted-foreground">Voici un aperçu de votre exploitation agricole</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm text-agri-primary font-medium bg-agri-primary/10 rounded-lg hover:bg-agri-primary/20 transition-colors">
            <Calendar className="h-4 w-4 inline mr-2" />
            Août 2023
          </button>
          <button className="px-4 py-2 text-sm bg-agri-primary text-white rounded-lg hover:bg-agri-primary-dark transition-colors">
            <Wallet className="h-4 w-4 inline mr-2" />
            Ajouter une transaction
          </button>
        </div>
      </header>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card card-hover">
          <p className="stat-label">Revenu mensuel</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="stat-value">12,345 €</p>
            <span className="text-agri-success text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> +8.2%
            </span>
          </div>
        </div>
        
        <div className="stat-card card-hover">
          <p className="stat-label">Superficie cultivée</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="stat-value">42 ha</p>
            <span className="text-agri-primary text-sm font-medium">5 parcelles</span>
          </div>
        </div>
        
        <div className="stat-card card-hover">
          <p className="stat-label">Rendement moyen</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="stat-value">7.5 t/ha</p>
            <span className="text-agri-success text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> +4.3%
            </span>
          </div>
        </div>
        
        <div className="stat-card card-hover">
          <p className="stat-label">Alertes</p>
          <div className="flex items-baseline justify-between mt-2">
            <p className="stat-value">3</p>
            <span className="text-agri-warning text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" /> Récent
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="dashboard-card col-span-full lg:col-span-2 card-hover">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Revenu Mensuel</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-3 py-1.5 bg-muted rounded-md text-foreground">2023</button>
              <button className="text-xs px-3 py-1.5 text-muted-foreground hover:bg-muted rounded-md">2022</button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value} €`} />
                <Tooltip formatter={(value) => [`${value} €`, 'Revenu']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4CAF50" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  activeDot={{ r: 8 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Production Distribution */}
        <div className="dashboard-card card-hover">
          <h3 className="font-semibold mb-4">Répartition des Cultures</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productionData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={80} 
                />
                <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                <Bar 
                  dataKey="value" 
                  fill="#8D6E63" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Forecast */}
        <div className="dashboard-card card-hover">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Météo</h3>
            <span className="text-sm text-muted-foreground">Saint-Étienne, Loire</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <Sun className="h-10 w-10 text-agri-warning" />
              <div>
                <p className="text-2xl font-semibold">22°C</p>
                <p className="text-sm text-muted-foreground">Ensoleillé</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Wind className="h-4 w-4 mr-1" /> 8 km/h
              </div>
              <div className="flex items-center">
                <Droplet className="h-4 w-4 mr-1" /> 42%
              </div>
              <div className="flex items-center">
                <CloudRain className="h-4 w-4 mr-1" /> 5%
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mt-6">
            {weatherForecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-sm font-medium">{day.day}</p>
                <day.icon className="h-6 w-6 mx-auto my-2 text-muted-foreground" />
                <p className="text-sm font-semibold">{day.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Upcoming Tasks */}
        <div className="dashboard-card card-hover">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Tâches à venir</h3>
            <button className="text-xs text-agri-primary hover:underline">Voir tout</button>
          </div>
          
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-center p-2 rounded-lg hover:bg-muted"
              >
                <div 
                  className={`w-2 h-2 rounded-full mr-3 ${
                    task.priority === 'high' 
                      ? 'bg-agri-danger' 
                      : task.priority === 'medium' 
                        ? 'bg-agri-warning' 
                        : 'bg-agri-success'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Échéance: {task.due}</p>
                </div>
                <button className="p-1.5 hover:bg-muted rounded">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Alerts */}
        <div className="dashboard-card card-hover">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Alertes</h3>
            <button className="text-xs text-agri-primary hover:underline">Gérer les alertes</button>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg ${
                  alert.type === 'danger' 
                    ? 'bg-agri-danger/10 border-l-4 border-agri-danger' 
                    : alert.type === 'warning' 
                      ? 'bg-agri-warning/10 border-l-4 border-agri-warning' 
                      : 'bg-agri-info/10 border-l-4 border-agri-info'
                }`}
              >
                <div className="flex items-start">
                  <AlertTriangle className={`h-5 w-5 mr-2 ${
                    alert.type === 'danger' 
                      ? 'text-agri-danger' 
                      : alert.type === 'warning' 
                        ? 'text-agri-warning' 
                        : 'text-agri-info'
                  }`} />
                  <p className="text-sm">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
