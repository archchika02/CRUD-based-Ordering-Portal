import { describe, it, expect } from 'vitest';
import { calculateTotal, estimateShippingDate } from '../utils/orderUtils';

describe('Order Utils', () => {
  describe('calculateTotal', () => {
    it('should calculate the product of price and quantity', () => {
      expect(calculateTotal(100, 2)).toBe(200);
      expect(calculateTotal(450.50, 10)).toBe(4505);
    });

    it('should return 0 if quantity is 0', () => {
      expect(calculateTotal(1000, 0)).toBe(0);
    });
  });

  describe('estimateShippingDate', () => {
    it('should return a date 3 days in the future', () => {
      const start = '2026-04-14T12:00:00.000Z';
      const expected = '2026-04-17T12:00:00.000Z';
      expect(estimateShippingDate(start)).toBe(expected);
    });

    it('should handle end-of-month rolls', () => {
      const start = '2026-04-29T10:00:00.000Z';
      const expected = '2026-05-02T10:00:00.000Z';
      expect(estimateShippingDate(start)).toBe(expected);
    });
  });
});
