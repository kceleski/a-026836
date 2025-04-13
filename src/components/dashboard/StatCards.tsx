
import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { EditableField } from '../ui/editable-field';

interface StatCardsProps {
  monthlyRevenue: number;
  revenueGrowth: number;
  cultivatedArea: number;
  parcelsCount: number;
  averageYield: number;
  yieldGrowth: number;
  alertsCount: number;
  handleRevenueChange: (value: string | number) => void;
  handleRevenueGrowthChange: (value: string | number) => void;
  handleAreaChange: (value: string | number) => void;
  handleParcelsCountChange: (value: string | number) => void;
  handleYieldChange: (value: string | number) => void;
  handleYieldGrowthChange: (value: string | number) => void;
}

const StatCards: React.FC<StatCardsProps> = ({
  monthlyRevenue,
  revenueGrowth,
  cultivatedArea,
  parcelsCount,
  averageYield,
  yieldGrowth,
  alertsCount,
  handleRevenueChange,
  handleRevenueGrowthChange,
  handleAreaChange,
  handleParcelsCountChange,
  handleYieldChange,
  handleYieldGrowthChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="stat-card card-hover animate-enter">
        <p className="stat-label">Revenu mensuel</p>
        <div className="flex items-baseline justify-between mt-2">
          <p className="stat-value">
            <EditableField
              value={monthlyRevenue}
              type="number"
              onSave={handleRevenueChange}
              className="inline-block font-bold"
            /> €
          </p>
          <span className="text-agri-success text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" /> +
            <EditableField
              value={revenueGrowth}
              type="number"
              onSave={handleRevenueGrowthChange}
              className="inline-block"
            />%
          </span>
        </div>
      </div>
      
      <div className="stat-card card-hover animate-enter" style={{ animationDelay: '100ms' }}>
        <p className="stat-label">Superficie cultivée</p>
        <div className="flex items-baseline justify-between mt-2">
          <p className="stat-value">
            <EditableField
              value={cultivatedArea}
              type="number"
              onSave={handleAreaChange}
              className="inline-block font-bold"
            /> ha
          </p>
          <span className="text-agri-primary text-sm font-medium">
            <EditableField
              value={parcelsCount}
              type="number"
              onSave={handleParcelsCountChange}
              className="inline-block"
            /> parcelles
          </span>
        </div>
      </div>
      
      <div className="stat-card card-hover animate-enter" style={{ animationDelay: '200ms' }}>
        <p className="stat-label">Rendement moyen</p>
        <div className="flex items-baseline justify-between mt-2">
          <p className="stat-value">
            <EditableField
              value={averageYield}
              type="number"
              onSave={handleYieldChange}
              className="inline-block font-bold"
            /> t/ha
          </p>
          <span className="text-agri-success text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" /> +
            <EditableField
              value={yieldGrowth}
              type="number"
              onSave={handleYieldGrowthChange}
              className="inline-block"
            />%
          </span>
        </div>
      </div>
      
      <div className="stat-card card-hover animate-enter" style={{ animationDelay: '300ms' }}>
        <p className="stat-label">Alertes</p>
        <div className="flex items-baseline justify-between mt-2">
          <p className="stat-value">{alertsCount}</p>
          <span className="text-agri-warning text-sm font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" /> Récent
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
