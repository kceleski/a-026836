
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
    if (!data || Object.keys(data).length === 0) {
      toast.error("Données insuffisantes", {
        description: "Impossible de générer la fiche technique avec les données disponibles"
      });
      return;
    }

    toast.info("Génération de la fiche technique", {
      description: `Préparation de la fiche ${data.name || data.nom || ""}`
    });
    
    // Create a specific format for the technical sheet
    const techSheetData = [{
      nom: data.name || data.nom || "Non spécifié",
      nomScientifique: data.scientificName || data.nomScientifique || "Non spécifié",
      famille: data.family || data.famille || "Non spécifiée",
      origine: data.origin || data.origine || "Non spécifiée",
      saisonCulture: data.growingSeason || data.saisonCulture || "Non spécifiée",
      typeSol: data.soilType || data.typeSol || "Non spécifié",
      besoinEau: data.waterNeeds || data.besoinEau || "Non spécifié",
      fertilisation: data.fertilization || data.fertilisation || "Non spécifiée",
      ravageurs: data.pests || data.ravageurs || "Non spécifiés",
      maladies: data.diseases || data.maladies || "Non spécifiées",
      notes: data.notes || "Aucune note",
      type: data.type || "Non spécifié",
      periodeRecolte: data.harvestPeriod || data.periodeRecolte || "Non spécifiée",
      rendementHectare: data.yieldPerHectare || data.rendementHectare || "Non spécifié"
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
      toast.error("Erreur lors de la génération de la fiche technique", {
        description: "Veuillez vérifier les données ou contacter le support technique"
      });
    }
  };
  
  return (
    <Button
      variant={variant}
      className={className || `bg-green-600 hover:bg-green-700 text-white`}
      onClick={downloadTechnicalSheet}
    >
      <FileText className="mr-2 h-4 w-4" />
      Télécharger fiche technique
    </Button>
  );
};

export default TechnicalSheetButton;
