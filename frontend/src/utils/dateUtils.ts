/**
 * Date Formatting Utilities
 * Standardizes date presentation across the frontend
 */

/**
 * Converts an ISO string into a standard dd/mm/yyyy display format
 * @param isoString The date string from the backend
 * @returns Formatted string or TBD fallback
 */
export const formatDate = (isoString?: string): string => {
  if (!isoString) return 'TBD';
  
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return 'TBD';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
