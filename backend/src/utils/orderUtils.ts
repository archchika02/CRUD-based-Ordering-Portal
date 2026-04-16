/**
 * Order-related logical utilities
 * Isolated from database and express dependencies for easy unit testing
 */

/**
 * Calculates the total amount for an order line item
 * @param price Unit price
 * @param quantity Number of units
 * @returns Total amount
 */
export const calculateTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

/**
 * Estimates a shipping date based on the creation date
 * Default logic: 3 business days from creation
 * @param createdAt Order creation date string (ISO)
 * @returns Estimated shipping date string (ISO)
 */
export const estimateShippingDate = (createdAt: string): string => {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 3);
  return date.toISOString();
};
