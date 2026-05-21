import { asyncHandler } from '../utils/apiError.js';

export const invoice = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res.json({
    success: true,
    data: {
      invoiceNo: `NXF-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`,
      status: 'paid',
      pdfExportReady: true,
      lineItems: [{ label: 'Premium Elite Membership', amount: 24999 }],
      tax: 4499.82,
      total: 29498.82
    }
  });
});
