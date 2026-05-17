/**
 * Helper utility functions
 */
const generateBillNumber = () => {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BILL-${y}${m}${d}-${rand}`;
};

const calculateGST = (subtotal, gstPercent = 18) => {
  const gst = (parseFloat(subtotal) * parseFloat(gstPercent)) / 100;
  return {
    gst_amount: Math.round(gst * 100) / 100,
    total: Math.round((parseFloat(subtotal) + gst) * 100) / 100,
  };
};

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const getMonthRange = (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  return { start, end };
};

module.exports = {
  generateBillNumber,
  calculateGST,
  getTodayRange,
  getMonthRange,
};
