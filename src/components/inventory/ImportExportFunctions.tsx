
import { toast } from 'sonner';
import Papa from 'papaparse';

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  price: number;
  location: string;
  lastUpdated: string;
  [key: string]: any;
};

export const exportInventoryToCSV = (inventoryData: InventoryItem[]) => {
  try {
    const csv = Papa.unparse(inventoryData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `inventaire_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Données exportées avec succès");
    return true;
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Erreur lors de l'exportation des données");
    return false;
  }
};

export const importInventoryFromCSV = (
  file: File, 
  onComplete: (data: InventoryItem[]) => void
) => {
  try {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData = results.data as any[];
        
        // Validate and transform data
        const validData = parsedData
          .filter(item => item.name && item.category)
          .map((item, index) => ({
            id: Number(item.id) || Math.max(1000, index + 1000),
            name: item.name,
            category: item.category,
            quantity: Number(item.quantity) || 0,
            unit: item.unit || 'unité',
            minQuantity: Number(item.minQuantity) || 0,
            price: Number(item.price) || 0,
            location: item.location || '',
            lastUpdated: item.lastUpdated || new Date().toISOString().split('T')[0]
          }));
        
        if (validData.length === 0) {
          toast.error("Aucune donnée valide n'a été trouvée dans le fichier");
          return;
        }
        
        onComplete(validData);
        toast.success(`${validData.length} articles importés avec succès`);
      },
      error: (error) => {
        console.error("Import error:", error);
        toast.error("Erreur lors de l'importation des données");
      }
    });
    return true;
  } catch (error) {
    console.error("Import error:", error);
    toast.error("Erreur lors de l'importation des données");
    return false;
  }
};
