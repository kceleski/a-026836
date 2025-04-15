
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechnicalSheetButtonProps {
  data: any;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
}

const TechnicalSheetButton: React.FC<TechnicalSheetButtonProps> = ({ 
  data, 
  className = "",
  variant = "default",
  children,
  size = "default"
}) => {
  const { exportModuleData } = useCRM();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const downloadTechnicalSheet = async () => {
    if (!data || Object.keys(data).length === 0) {
      console.error("Données insuffisantes pour générer la fiche technique");
      return;
    }

    setIsGenerating(true);
    
    // Format amélioré pour la fiche technique
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
      rendementHectare: data.yieldPerHectare || data.rendementHectare || data.currentYield || "Non spécifié"
    }];
    
    try {
      await exportModuleData('fiche_technique', 'pdf', techSheetData);
    } catch (error) {
      console.error("Error generating technical sheet:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={className || `bg-green-600 hover:bg-green-700 text-white transition-colors duration-200`}
            onClick={downloadTechnicalSheet}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : children || (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Télécharger fiche technique
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Générer une fiche technique détaillée</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechnicalSheetButton;
