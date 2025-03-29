
import React from 'react';
import { Check, Layers, ArrowRight } from 'lucide-react';

const EnvironmentalCharts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-4">Bilan carbone</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full border-8 border-agri-primary"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">-15%</span>
                  <span className="text-xs text-muted-foreground">vs N-1</span>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Réduction des émissions de carbone grâce aux pratiques agricoles durables.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-4">Consommation d'eau</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full border-8 border-[#2196F3]"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">-8%</span>
                  <span className="text-xs text-muted-foreground">vs N-1</span>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Réduction de la consommation d'eau par optimisation de l'irrigation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border p-6 flex flex-col">
          <h3 className="text-lg font-medium mb-4">Biodiversité</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full border-8 border-[#FFC107]"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">+12%</span>
                  <span className="text-xs text-muted-foreground">vs N-1</span>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Augmentation de la biodiversité sur l'exploitation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">Indicateurs environnementaux</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Indicateur</th>
                <th className="px-4 py-2 text-left">Valeur actuelle</th>
                <th className="px-4 py-2 text-left">Objectif</th>
                <th className="px-4 py-2 text-left">Tendance</th>
                <th className="px-4 py-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">Émissions CO2 (t/ha)</td>
                <td className="px-4 py-3">2.8</td>
                <td className="px-4 py-3">2.5</td>
                <td className="px-4 py-3 text-agri-success">↓ -5%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-warning/10 text-agri-warning">
                    En progrès
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">Consommation d'eau (m³/ha)</td>
                <td className="px-4 py-3">350</td>
                <td className="px-4 py-3">320</td>
                <td className="px-4 py-3 text-agri-success">↓ -8%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-success/10 text-agri-success">
                    Atteint
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">Utilisation d'intrants (kg/ha)</td>
                <td className="px-4 py-3">180</td>
                <td className="px-4 py-3">150</td>
                <td className="px-4 py-3 text-agri-success">↓ -12%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-warning/10 text-agri-warning">
                    En progrès
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">Surface en agriculture bio (%)</td>
                <td className="px-4 py-3">15%</td>
                <td className="px-4 py-3">25%</td>
                <td className="px-4 py-3 text-agri-success">↑ +5%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-warning/10 text-agri-warning">
                    En progrès
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">Biodiversité (espèces/ha)</td>
                <td className="px-4 py-3">12</td>
                <td className="px-4 py-3">15</td>
                <td className="px-4 py-3 text-agri-success">↑ +12%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-agri-success/10 text-agri-success">
                    Atteint
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border p-6">
        <h3 className="text-lg font-medium mb-4">Certifications et engagements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-agri-primary/10 flex items-center justify-center mb-2">
              <Check className="h-8 w-8 text-agri-primary" />
            </div>
            <h4 className="font-medium mb-1">Agriculture Raisonnée</h4>
            <p className="text-sm text-center text-muted-foreground">
              Certifié depuis 2019
            </p>
          </div>
          <div className="border rounded-lg p-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#FFC107]/10 flex items-center justify-center mb-2">
              <Layers className="h-8 w-8 text-[#FFC107]" />
            </div>
            <h4 className="font-medium mb-1">HVE Niveau 2</h4>
            <p className="text-sm text-center text-muted-foreground">
              Haute Valeur Environnementale
            </p>
          </div>
          <div className="border rounded-lg p-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#2196F3]/10 flex items-center justify-center mb-2">
              <ArrowRight className="h-8 w-8 text-[#2196F3]" />
            </div>
            <h4 className="font-medium mb-1">En conversion Bio</h4>
            <p className="text-sm text-center text-muted-foreground">
              15% de la surface totale
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalCharts;
