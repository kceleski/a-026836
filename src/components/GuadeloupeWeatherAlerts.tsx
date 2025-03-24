
import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, AlertTriangle, Droplet, Thermometer } from 'lucide-react';
import { EditableField } from './ui/editable-field';

interface WeatherAlert {
  id: number;
  type: 'cyclone' | 'drought' | 'heavyRain' | 'heatWave';
  severity: 'low' | 'medium' | 'high';
  message: string;
  region: string;
  date: string;
}

const GuadeloupeWeatherAlerts = () => {
  const [title, setTitle] = useState('Météo et Alertes Guadeloupe');
  const [location, setLocation] = useState('Pointe-à-Pitre, Guadeloupe');
  
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 29,
    condition: 'Ensoleillé',
    humidity: 75,
    windSpeed: 12,
    rainChance: 20,
    icon: Sun,
  });
  
  const [alerts, setAlerts] = useState<WeatherAlert[]>([
    {
      id: 1,
      type: 'cyclone',
      severity: 'medium',
      message: 'Vigilance cyclonique - Surveillance renforcée',
      region: 'Archipel Guadeloupéen',
      date: '15/09/2023'
    },
    {
      id: 2,
      type: 'drought',
      severity: 'high',
      message: 'Sécheresse persistante - Restrictions d\'eau en vigueur',
      region: 'Grande-Terre',
      date: '25/08/2023'
    },
    {
      id: 3,
      type: 'heavyRain',
      severity: 'low',
      message: 'Fortes pluies attendues - Risques d\'inondations localisées',
      region: 'Basse-Terre',
      date: '10/09/2023'
    }
  ]);
  
  // Prévisions pour les prochains jours (adapté au climat tropical)
  const [forecast, setForecast] = useState([
    { day: 'Lun', temp: 29, icon: Sun, condition: 'Ensoleillé' },
    { day: 'Mar', temp: 28, icon: CloudRain, condition: 'Averses' },
    { day: 'Mer', temp: 30, icon: Sun, condition: 'Chaud' },
    { day: 'Jeu', temp: 29, icon: Cloud, condition: 'Nuageux' },
    { day: 'Ven', temp: 28, icon: CloudRain, condition: 'Pluie' }
  ]);
  
  const handleEditAlert = (id: number, field: keyof WeatherAlert, value: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, [field]: value } : alert
    ));
  };
  
  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  const handleAddAlert = () => {
    const newId = Math.max(0, ...alerts.map(a => a.id)) + 1;
    setAlerts([...alerts, {
      id: newId,
      type: 'heavyRain',
      severity: 'medium',
      message: 'Nouvelle alerte',
      region: 'Toute l\'île',
      date: new Date().toLocaleDateString('fr-FR')
    }]);
  };
  
  const getAlertIcon = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'cyclone': return <Wind className="h-5 w-5 text-red-500" />;
      case 'drought': return <Thermometer className="h-5 w-5 text-orange-500" />;
      case 'heavyRain': return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'heatWave': return <Sun className="h-5 w-5 text-yellow-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getAlertClass = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-l-4 border-red-500';
      case 'medium': return 'bg-orange-100 border-l-4 border-orange-500';
      case 'low': return 'bg-yellow-100 border-l-4 border-yellow-500';
      default: return 'bg-gray-100 border-l-4 border-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">
            <EditableField value={title} onSave={setTitle} />
          </h3>
          <span className="text-sm text-muted-foreground">
            <EditableField value={location} onSave={setLocation} />
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <currentWeather.icon className="h-12 w-12 text-yellow-500" />
            <div>
              <p className="text-3xl font-semibold">
                <EditableField 
                  value={currentWeather.temperature.toString()} 
                  onSave={(value) => setCurrentWeather({...currentWeather, temperature: Number(value)})}
                  type="number"
                />°C
              </p>
              <p className="text-sm text-muted-foreground">
                <EditableField 
                  value={currentWeather.condition} 
                  onSave={(value) => setCurrentWeather({...currentWeather, condition: value.toString()})}
                />
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Wind className="h-4 w-4 mr-1" /> 
              <EditableField 
                value={currentWeather.windSpeed.toString()} 
                onSave={(value) => setCurrentWeather({...currentWeather, windSpeed: Number(value)})}
                type="number"
              /> km/h
            </div>
            <div className="flex items-center">
              <Droplet className="h-4 w-4 mr-1" /> 
              <EditableField 
                value={currentWeather.humidity.toString()} 
                onSave={(value) => setCurrentWeather({...currentWeather, humidity: Number(value)})}
                type="number"
              />%
            </div>
            <div className="flex items-center">
              <CloudRain className="h-4 w-4 mr-1" /> 
              <EditableField 
                value={currentWeather.rainChance.toString()} 
                onSave={(value) => setCurrentWeather({...currentWeather, rainChance: Number(value)})}
                type="number"
              />%
            </div>
          </div>
        </div>
        
        <h4 className="text-sm font-medium mb-3">Prévisions 5 jours</h4>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-sm font-medium">{day.day}</p>
              <day.icon className="h-8 w-8 mx-auto my-2 text-muted-foreground" />
              <p className="text-sm font-semibold">{day.temp}°C</p>
              <p className="text-xs text-muted-foreground">{day.condition}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Ces prévisions sont adaptées au climat tropical de la Guadeloupe et sont modifiables à des fins de démonstration.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Alertes Météorologiques</h3>
          <button 
            onClick={handleAddAlert}
            className="text-xs px-3 py-1 bg-agri-primary text-white rounded hover:bg-agri-primary-dark"
          >
            Ajouter alerte
          </button>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg ${getAlertClass(alert.severity)}`}>
              <div className="flex items-start">
                {getAlertIcon(alert.type)}
                <div className="ml-2 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">
                        <EditableField 
                          value={alert.message} 
                          onSave={(value) => handleEditAlert(alert.id, 'message', value.toString())}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Région: <EditableField 
                          value={alert.region} 
                          onSave={(value) => handleEditAlert(alert.id, 'region', value.toString())}
                        />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Date: <EditableField 
                          value={alert.date} 
                          onSave={(value) => handleEditAlert(alert.id, 'date', value.toString())}
                        />
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {alerts.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              Aucune alerte en cours
            </p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Légende des alertes</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <Wind className="h-4 w-4 mr-1 text-red-500" /> Cyclone
            </div>
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 mr-1 text-orange-500" /> Sécheresse
            </div>
            <div className="flex items-center">
              <CloudRain className="h-4 w-4 mr-1 text-blue-500" /> Fortes pluies
            </div>
            <div className="flex items-center">
              <Sun className="h-4 w-4 mr-1 text-yellow-500" /> Canicule
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuadeloupeWeatherAlerts;
