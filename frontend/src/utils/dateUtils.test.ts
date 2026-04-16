import { formatDate } from './dateUtils';

describe('Date Utilities', () => {
  it('should format a valid ISO string to dd/mm/yyyy', () => {
    const input = '2026-04-14T10:00:00.000Z';
    const result = formatDate(input);
    expect(result).toBe('14/04/2026');
  });

  it('should handle single digit days and months with zero padding', () => {
    const input = '2026-01-05T10:00:00.000Z';
    const result = formatDate(input);
    expect(result).toBe('05/01/2026');
  });

  it('should return TBD for undefined or empty input', () => {
    expect(formatDate(undefined)).toBe('TBD');
    expect(formatDate('')).toBe('TBD');
  });

  it('should return TBD for invalid date strings', () => {
    expect(formatDate('not-a-date')).toBe('TBD');
  });
});
