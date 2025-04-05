
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner';

interface TechnicalSheetButtonProps {
  data: any;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const TechnicalSheetButton: React.FC<TechnicalSheetButtonProps> = ({ 
  data, 
  className = "",
  variant = "default"
}) => {
  const { exportModuleData } = useCRM();
  
  const downloadTechnicalSheet = async () => {
    toast.info("Génération de la fiche technique", {
      description: `Préparation de la fiche ${data.name || data.nom || ""}`
    });
    
    // Create a specific format for the technical sheet
    const techSheetData = [{
      nom: data.name || data.nom,
      nomScientifique: data.scientificName || data.nomScientifique,
      famille: data.family || data.famille,
      origine: data.origin || data.origine,
      saisonCulture: data.growingSeason || data.saisonCulture,
      typeSol: data.soilType || data.typeSol,
      besoinEau: data.waterNeeds || data.besoinEau,
      fertilisation: data.fertilization || data.fertilisation,
      ravageurs: data.pests || data.ravageurs,
      maladies: data.diseases || data.maladies,
      notes: data.notes,
      type: data.type,
      periodeRecolte: data.harvestPeriod || data.periodeRecolte,
      rendementHectare: data.yieldPerHectare || data.rendementHectare
    }];
    
    try {
      const success = await exportModuleData('fiche_technique', 'pdf', techSheetData);
      
      if (success) {
        toast.success("Fiche technique générée", {
          description: `La fiche technique est prête à être imprimée`
        });
      }
    } catch (error) {
      console.error("Error generating technical sheet:", error);
      toast.error("Erreur lors de la génération de la fiche technique");
    }
  };
  
  return (
    <Button
      variant={variant}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      onClick={downloadTechnicalSheet}
    >
      <FileText className="mr-2 h-4 w-4" />
      Télécharger fiche technique
    </Button>
  );
};

export default TechnicalSheetButton;
