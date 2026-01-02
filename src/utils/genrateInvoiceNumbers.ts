export const generateInvoiceNumber = () =>
  `INV-${Math.floor(100000 + Math.random() * 900000)}`;
