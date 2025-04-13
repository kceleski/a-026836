
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner';

interface ReportGenerationButtonProps {
  moduleName: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ReportGenerationButton: React.FC<ReportGenerationButtonProps> = ({
  moduleName,
  className = "",
  variant = "default"
}) => {
  const { exportModuleData } = useCRM();

  const generateReport = async () => {
    toast.info("Génération du rapport", {
      description: `Préparation du rapport pour ${moduleName}`
    });
    
    try {
      const success = await exportModuleData(moduleName, 'pdf');
      
      if (success) {
        toast.success("Rapport généré", {
          description: `Le rapport a été généré avec succès`
        });
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Erreur lors de la génération du rapport", {
        description: "Veuillez réessayer ou contacter le support technique"
      });
    }
  };

  return (
    <Button
      variant={variant}
      className={className || `bg-green-600 hover:bg-green-700 text-white`}
      onClick={generateReport}
    >
      <FileText className="mr-2 h-4 w-4" />
      Générer un rapport
    </Button>
  );
};

export default ReportGenerationButton;
