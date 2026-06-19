const { 
  VALID_EMAIL,
  VALID_PASSWORD,
  ADMIN_USER,
  employees,
  transactions,
  scheduled,
  templates,
  dashboardStats,
  complianceData,
  settingsData,
  bridgeData,
  treasuryBalances,
  buildActivitySeries,
} = require('../data/businessData');

function sendSuccess(res, data) {
  return res.status(200).json(data);
}

exports.login = (req, res) => {
  const { email, password } = req.body || {};
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return res.status(200).json({
      token: `mock-${Date.now()}`,
      user: ADMIN_USER,
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};

exports.me = (req, res) => {
  sendSuccess(res, { user: ADMIN_USER });
};

exports.dashboard = {
  stats: (req, res) => sendSuccess(res, dashboardStats),
  transactions: (req, res) => sendSuccess(res, { items: transactions }),
  activity: (req, res) => {
    const range = req.query.range || 'monthly';
    sendSuccess(res, { series: buildActivitySeries(range) });
  },
  upcoming: (req, res) => sendSuccess(res, { items: scheduled }),
};

exports.employees = (req, res) => sendSuccess(res, { items: employees });
exports.scheduledPayrolls = (req, res) => sendSuccess(res, { items: scheduled });
exports.payrollHistory = (req, res) => sendSuccess(res, { items: transactions.filter((t) => t.type === 'payroll') });
exports.templates = (req, res) => sendSuccess(res, { items: templates });
exports.treasury = (req, res) => sendSuccess(res, treasuryBalances);
exports.compliance = (req, res) => sendSuccess(res, complianceData);
exports.bridge = (req, res) => sendSuccess(res, bridgeData);
exports.settings = (req, res) => sendSuccess(res, settingsData);
