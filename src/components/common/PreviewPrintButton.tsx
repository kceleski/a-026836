
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Printer, FileText, Loader2 } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PreviewPrintButtonProps {
  data: any[];
  moduleName: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showPreview?: boolean;
  columns?: { key: string, header: string }[];
  title?: string;
}

const PreviewPrintButton: React.FC<PreviewPrintButtonProps> = ({
  data,
  moduleName,
  className = "",
  variant = "outline",
  showPreview = true,
  columns,
  title
}) => {
  const { printModuleData, exportModuleData } = useCRM();
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHTML, setPreviewHTML] = useState<string>('');

  const handlePrint = async () => {
    if (!data || data.length === 0) {
      console.error("Aucune donnée à imprimer");
      return;
    }

    setIsActionInProgress(true);
    
    try {
      await printModuleData(moduleName, {
        columns: columns,
        title: title || `Aperçu - ${moduleName}`
      });
      console.log("Document envoyé à l'impression");
    } catch (error) {
      console.error("Erreur lors de l'impression:", error);
    } finally {
      setIsActionInProgress(false);
    }
  };

  const generatePreviewHTML = () => {
    if (!data || data.length === 0) {
      return '<div class="p-4 text-center">Aucune donnée disponible pour l\'aperçu</div>';
    }

    const tableHeaders = (columns || Object.keys(data[0]).map(key => ({ key, header: key }))).map(
      col => `<th class="px-4 py-2 bg-gray-100 border-b">${col.header}</th>`
    ).join('');

    const tableRows = data.map(row => {
      const cells = (columns || Object.keys(row).map(key => ({ key, header: key }))).map(
        col => `<td class="px-4 py-2 border-b">${row[col.key] || ''}</td>`
      ).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">${title || `Aperçu - ${moduleName}`}</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr>${tableHeaders}</tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
        <div class="mt-6 text-sm text-gray-500 text-right">
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;
  };

  const handleShowPreview = () => {
    setPreviewHTML(generatePreviewHTML());
    setPreviewOpen(true);
  };

  const handleExportPDF = async () => {
    if (!data || data.length === 0) {
      console.error("Aucune donnée à exporter");
      return;
    }

    setIsActionInProgress(true);
    
    try {
      await exportModuleData(moduleName, 'pdf', data);
      console.log("PDF généré avec succès");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    } finally {
      setIsActionInProgress(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={variant} 
                  size="sm"
                  className={`transition-all ${className}`}
                  disabled={isActionInProgress}
                >
                  {isActionInProgress ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">Aperçu</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Aperçu et impression</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent align="end" className="w-56">
          {showPreview && (
            <DropdownMenuItem onClick={handleShowPreview} className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              <span>Aperçu à l'écran</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
            <Printer className="mr-2 h-4 w-4" />
            <span>Imprimer</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Exporter en PDF</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{title || `Aperçu - ${moduleName}`}</DialogTitle>
            <DialogDescription>
              Aperçu avant impression
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-auto border rounded-md mt-4 bg-white">
            <iframe
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                      table { width: 100%; border-collapse: collapse; }
                      th { text-align: left; }
                      @media print {
                        body { padding: 1cm; }
                        button { display: none; }
                      }
                    </style>
                  </head>
                  <body>
                    ${previewHTML}
                  </body>
                </html>
              `}
              className="w-full h-full border-none"
              title="Preview"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Fermer
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewPrintButton;
