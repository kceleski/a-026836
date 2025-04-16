
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
import { useAppSettings } from '@/contexts/AppSettingsContext';
import PreviewContainer from './PreviewContainer';

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
  const { settings } = useAppSettings();
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
          <p>Date: ${new Date().toLocaleDateString(settings.locale)}</p>
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

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
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
                  aria-label="Options d'aperçu et d'impression"
                >
                  {isActionInProgress ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
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
            <DropdownMenuItem 
              onClick={handleShowPreview} 
              className="cursor-pointer"
              onKeyDown={(e) => handleKeyDown(e, handleShowPreview)}
            >
              <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Aperçu à l'écran</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem 
            onClick={handlePrint} 
            className="cursor-pointer"
            onKeyDown={(e) => handleKeyDown(e, handlePrint)}
          >
            <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Imprimer</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleExportPDF} 
            className="cursor-pointer"
            onKeyDown={(e) => handleKeyDown(e, handleExportPDF)}
          >
            <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
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
                <html lang="${settings.locale || 'fr'}">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title || `Aperçu - ${moduleName}`}</title>
                    <style>
                      :root {
                        --font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        --primary-color: ${settings.darkMode ? '#8BADE3' : '#4CAF50'};
                        --border-color: ${settings.darkMode ? '#3A3A3A' : '#e5e7eb'};
                        --bg-color: ${settings.darkMode ? '#1F1F1F' : '#ffffff'};
                        --text-color: ${settings.darkMode ? '#E1E1E1' : '#333333'};
                        --muted-color: ${settings.darkMode ? '#A0A0A0' : '#6B7280'};
                        --header-bg: ${settings.darkMode ? '#2D2D2D' : '#F9FAFB'};
                      }
                      
                      body {
                        font-family: var(--font-family);
                        margin: 0;
                        padding: 0;
                        background-color: var(--bg-color);
                        color: var(--text-color);
                      }
                      
                      .preview-container {
                        max-width: 100%;
                        margin: 0 auto;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                      }
                      
                      .preview-header {
                        background-color: var(--header-bg);
                        padding: 20px;
                        border-bottom: 1px solid var(--border-color);
                      }
                      
                      .preview-header h2 {
                        margin: 0;
                        font-size: 20px;
                        color: var(--text-color);
                      }
                      
                      .preview-content {
                        padding: 20px;
                      }
                      
                      table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        font-size: 14px;
                      }
                      
                      th {
                        background-color: var(--header-bg);
                        padding: 10px 15px;
                        text-align: left;
                        font-weight: 600;
                        border-bottom: 2px solid var(--border-color);
                        color: var(--text-color);
                      }
                      
                      td {
                        padding: 10px 15px;
                        border-bottom: 1px solid var(--border-color);
                      }
                      
                      tr:nth-child(even) {
                        background-color: ${settings.darkMode ? '#2A2A2A' : '#f9fafb'};
                      }
                      
                      tr:hover {
                        background-color: ${settings.darkMode ? '#333333' : '#f3f4f6'};
                      }
                      
                      .footer {
                        margin-top: 30px;
                        text-align: right;
                        font-size: 12px;
                        color: var(--muted-color);
                        padding-top: 10px;
                        border-top: 1px solid var(--border-color);
                      }

                      @media print {
                        body {
                          padding: 0;
                          background-color: white;
                          color: black;
                        }
                        button { display: none; }
                        .preview-container {
                          box-shadow: none;
                          border: none;
                        }
                        table, th, td {
                          color: black;
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <div class="preview-container">
                      ${previewHTML}
                    </div>
                  </body>
                </html>
              `}
              className="w-full h-full border-none"
              title="Preview"
              aria-label={`Aperçu du document: ${title || moduleName}`}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setPreviewOpen(false)}
            >
              Fermer
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
              Imprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewPrintButton;
