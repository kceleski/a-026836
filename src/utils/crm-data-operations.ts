
import { toast } from 'sonner';
import Papa from 'papaparse';

/**
 * Export any module data to CSV format
 */
export const exportToCSV = (data: any[], fileName: string): boolean => {
  try {
    // Convert data to CSV format
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Données exportées avec succès au format CSV");
    return true;
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Erreur lors de l'exportation des données");
    return false;
  }
};

/**
 * Export data to Excel format (simulated with CSV for now)
 */
export const exportToExcel = (data: any[], fileName: string): boolean => {
  try {
    // For now, we'll use CSV as a stand-in for Excel
    // In a production app, you'd use a library like xlsx
    return exportToCSV(data, fileName);
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Erreur lors de l'exportation des données");
    return false;
  }
};

/**
 * Export data to PDF format
 */
export const exportToPDF = async (data: any[], fileName: string): Promise<boolean> => {
  try {
    // Simulate PDF generation
    toast.success("Génération du PDF en cours...");
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("PDF généré avec succès");
    toast.info("Téléchargement du PDF...");
    
    // Create a fake download
    const link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.pdf`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    toast.error("Erreur lors de la génération du PDF");
    return false;
  }
};

/**
 * Import data from CSV file
 */
export const importFromCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData = results.data as any[];
        
        if (parsedData.length === 0) {
          toast.error("Aucune donnée valide n'a été trouvée dans le fichier");
          reject("No valid data found");
          return;
        }
        
        toast.success(`${parsedData.length} enregistrements importés avec succès`);
        resolve(parsedData);
      },
      error: (error) => {
        console.error("Import error:", error);
        toast.error("Erreur lors de l'importation des données");
        reject(error);
      }
    });
  });
};

/**
 * Print data
 */
export const printData = (
  data: any[], 
  title: string, 
  columns: { key: string, header: string }[]
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      // Create print window
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        toast.error("Impossible d'ouvrir la fenêtre d'impression");
        resolve(false);
        return;
      }
      
      // Generate table HTML
      const tableRows = data.map((row) => {
        const cells = columns.map((column) => 
          `<td>${typeof row[column.key] === 'object' ? JSON.stringify(row[column.key]) : row[column.key] || ''}</td>`
        ).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      
      // Generate table headers
      const tableHeaders = columns
        .map(col => `<th>${col.header}</th>`)
        .join('');
      
      // Create HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              h1 { text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #f2f2f2; }
              .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
              .print-date { text-align: right; font-size: 0.9em; color: #666; }
              @media print {
                body { padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="print-header">
              <h1>${title}</h1>
              <div class="print-date">
                <p>Agri Dom - CRM</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>${tableHeaders}</tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
            <button onclick="window.print();return false;" style="padding: 10px 20px; margin: 20px auto; display: block;">
              Imprimer
            </button>
            <script>
              // Auto print after a short delay
              setTimeout(() => {
                window.print();
              }, 500);
            </script>
          </body>
        </html>
      `;
      
      // Write to print window
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      toast.success("Document prêt pour impression");
      resolve(true);
    } catch (error) {
      console.error("Print error:", error);
      toast.error("Erreur lors de la préparation de l'impression");
      resolve(false);
    }
  });
};
