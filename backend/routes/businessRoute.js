const express = require('express');
const { login, me, dashboard, employees, payrollHistory, scheduledPayrolls, templates, treasury, compliance, bridge, settings } = require('../controllers/businessController');

const router = express.Router();

router.post('/auth/login', login);
router.get('/auth/me', me);
router.post('/auth/forgot-password', (req, res) => {
  res.status(200).json({ success: true, message: 'Password reset link is ready for demo mode.' });
});

router.get('/dashboard/stats', dashboard.stats);
router.get('/dashboard/transactions', dashboard.transactions);
router.get('/dashboard/payroll-activity', dashboard.activity);
router.get('/dashboard/upcoming-payrolls', dashboard.upcoming);

router.get('/payroll/employees', employees);
router.post('/payroll/execute', (req, res) => {
  res.status(200).json({ success: true, message: 'Payroll executed', payload: req.body });
});
router.get('/payroll/scheduled', scheduledPayrolls);
router.get('/payroll/history', payrollHistory);
router.get('/payroll/templates', templates);

router.get('/treasury/balances', treasury);
router.get('/treasury/transactions', (req, res) => {
  res.status(200).json({ items: require('../data/businessData').transactions });
});

router.get('/compliance', compliance);
router.get('/bridge', bridge);
router.get('/settings', settings);
router.get('/settings/team', (req, res) => {
  res.status(200).json({ items: [{ id: 'u1', name: 'Admin User', email: 'admin@confidentialpay.com', role: 'Owner' }] });
});

module.exports = router;
