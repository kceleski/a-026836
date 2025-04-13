
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ChevronDown, FileSpreadsheet, FileBarChart2, FileImage } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ReportGenerationButtonProps {
  moduleName: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children?: React.ReactNode;
}

const ReportGenerationButton: React.FC<ReportGenerationButtonProps> = ({
  moduleName,
  className = "",
  variant = "default",
  children
}) => {
  const { exportModuleData } = useCRM();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async (format: 'pdf' | 'excel' | 'csv' | 'image') => {
    setIsGenerating(true);
    
    const formatNames = {
      pdf: 'PDF',
      excel: 'Excel',
      csv: 'CSV',
      image: 'Image'
    };
    
    toast.info("Génération du rapport", {
      description: `Préparation du rapport ${moduleName} au format ${formatNames[format]}`
    });
    
    try {
      const success = await exportModuleData(moduleName, format);
      
      if (success) {
        toast.success("Rapport généré", {
          description: `Le rapport a été généré avec succès au format ${formatNames[format]}`
        });
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Erreur lors de la génération du rapport", {
        description: "Veuillez réessayer ou contacter le support technique"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          className={className || `bg-green-600 hover:bg-green-700 text-white`}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération...
            </>
          ) : children || (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Générer un rapport
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => generateReport('pdf')} disabled={isGenerating}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Format PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateReport('excel')} disabled={isGenerating}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Format Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateReport('csv')} disabled={isGenerating}>
          <FileBarChart2 className="mr-2 h-4 w-4" />
          <span>Format CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateReport('image')} disabled={isGenerating}>
          <FileImage className="mr-2 h-4 w-4" />
          <span>Format Image</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportGenerationButton;
