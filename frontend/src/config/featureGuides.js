export const FEATURE_GUIDES = {
  hub: {
    title: 'Main Menu',
    steps: [
      'After login you land here — choose any feature card.',
      'No sidebar: all options are in the center.',
      'Use Logout from the top bar when finished.',
    ],
  },
  billing: {
    title: 'Billing & PDF',
    steps: [
      'Select fuel, enter liters and vehicle number (important for history).',
      'Choose payment: Cash, Card, Easypaisa, or JazzCash.',
      'After bill is created, click Download PDF to save receipt locally.',
      'Vehicle number links to Vehicle Search history.',
    ],
  },
  vehicles: {
    title: 'Vehicle Fill-up History',
    steps: [
      'Enter vehicle number (e.g. LEA-1234) and optional date range.',
      'Click Search to see every fill-up: fuel type, liters, date, payment.',
      'Use this to answer: which car filled petrol on a given date.',
    ],
  },
  employees: {
    title: 'Employees & Attendance',
    steps: [
      'Mark attendance: select employee, date, status (Present/Absent).',
      'View history: pick employee from dropdown → View History.',
      'History shows last 30 attendance records and salary entries.',
    ],
  },
  branches: {
    title: 'JUTT GM Branches',
    steps: [
      'See all JUTT GM pumps by city.',
      'Click Find Nearest Branch — allow GPS to see closest pump.',
      'Each branch shows Easypaisa & JazzCash account numbers.',
    ],
  },
  fuels: {
    title: 'Fuel Stock',
    steps: ['View petrol/diesel stock.', 'Admin can add or edit fuel types.', 'Low stock shows red alert on dashboard.'],
  },
  reports: {
    title: 'Reports',
    steps: ['Daily: pick a date.', 'Monthly: pick month/year.', 'Revenue: GST and total sales summary.'],
  },
};
