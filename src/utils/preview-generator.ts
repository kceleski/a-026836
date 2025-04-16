
import { useAppSettings } from '@/contexts/AppSettingsContext';

/**
 * Generate HTML content for preview based on data and columns
 */
export const generatePreviewHTML = (
  data: any[], 
  moduleName: string,
  title?: string,
  columns?: { key: string, header: string }[],
  locale?: string
): string => {
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
        <p>Date: ${new Date().toLocaleDateString(locale || 'fr-FR')}</p>
      </div>
    </div>
  `;
};
