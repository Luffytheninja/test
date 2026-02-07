import React, { useState, useEffect } from 'react';
import { Calculator, Heart, Shield, Bell, TrendingUp, AlertCircle, CheckCircle, DollarSign, Download, Calendar, BarChart3, FileText, Mail, Plus, Trash2, Receipt, Eye, EyeOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function TAxedSystem() {
  const [monthlyIncome, setMonthlyIncome] = useState(200000);
  const [lifePremium, setLifePremium] = useState(0);
  const [healthPremium, setHealthPremium] = useState(0);
  const [nhiaVoluntary, setNhiaVoluntary] = useState(0);
  const [rentPaid, setRentPaid] = useState(0);
  const [utilityPercentage, setUtilityPercentage] = useState(40);
  const [monthlyUtilities, setMonthlyUtilities] = useState(20000);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [results, setResults] = useState(null);
  const [showQuarterly, setShowQuarterly] = useState(false);
  const [showMultiYear, setShowMultiYear] = useState(false);
  const [showInsuranceAPI, setShowInsuranceAPI] = useState(false);
  const [showEmailScheduler, setShowEmailScheduler] = useState(false);
  const [showIncomeTracker, setShowIncomeTracker] = useState(false);
  const [showExpenseTracker, setShowExpenseTracker] = useState(false);
  
  // Email Scheduler State
  const [emailAddress, setEmailAddress] = useState('');
  const [emailReminders, setEmailReminders] = useState([]);
  
  // Income Tracker State
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [newIncome, setNewIncome] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    receiptId: '',
    client: '',
    category: 'Design Services'
  });
  
  // Expense Tracker State
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    receiptId: '',
    category: 'Utilities',
    deductible: true
  });

  useEffect(() => {
    calculateTax();
  }, [monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid, utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries]);

  const calculateTax = () => {
    // Calculate actual income from entries
    const totalTrackedIncome = incomeEntries.reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);
    const totalTrackedExpenses = expenseEntries.filter(e => e.deductible).reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);
    
    // Use tracked income if available, otherwise use manual input
    const annualGross = totalTrackedIncome > 0 ? totalTrackedIncome : monthlyIncome * 12;
    
    const pension = annualGross * 0.08;
    const nhf = annualGross * 0.025;
    const maxLifeRelief = annualGross * 0.20;
    const lifeInsuranceRelief = Math.min(lifePremium, maxLifeRelief);
    const lifeInsuranceUnused = maxLifeRelief - lifeInsuranceRelief;
    const rentRelief = Math.min(rentPaid * 0.20, 500000);
    
    // Include tracked expenses in deductions
    const annualUtilities = monthlyUtilities * 12;
    const businessUtilities = annualUtilities * (utilityPercentage / 100);
    const totalBusinessExpenses = totalTrackedExpenses + businessUtilities;
    
    const totalDeductions = pension + nhf + lifeInsuranceRelief + rentRelief + totalBusinessExpenses;
    const netIncome = annualGross - totalDeductions;
    const taxFreeAllowance = 800000;
    const chargeableIncome = Math.max(0, netIncome - taxFreeAllowance);
    const annualTax = chargeableIncome * 0.15;
    const monthlyTax = annualTax / 12;
    const monthlyTakeHome = (annualGross / 12) - monthlyTax;
    const annualTakeHome = monthlyTakeHome * 12;
    const potentialAdditionalLife = lifeInsuranceUnused;
    const potentialTaxSavings = potentialAdditionalLife * 0.15;
    const nhiaMandatory = employeeCount >= 3;
    
    setResults({
      annualGross, pension, nhf, lifeInsuranceRelief, lifeInsuranceUnused,
      maxLifeRelief, rentRelief, businessUtilities, totalBusinessExpenses,
      totalDeductions, netIncome, taxFreeAllowance, chargeableIncome, annualTax, 
      monthlyTax, monthlyTakeHome, annualTakeHome, potentialAdditionalLife, 
      potentialTaxSavings, nhiaMandatory, healthPremium, nhiaVoluntary,
      totalTrackedIncome, totalTrackedExpenses
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const addIncomeEntry = () => {
    if (newIncome.amount && newIncome.description) {
      setIncomeEntries([...incomeEntries, { ...newIncome, id: Date.now() }]);
      setNewIncome({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
        receiptId: '',
        client: '',
        category: 'Design Services'
      });
    }
  };

  const deleteIncomeEntry = (id) => {
    setIncomeEntries(incomeEntries.filter(entry => entry.id !== id));
  };

  const addExpenseEntry = () => {
    if (newExpense.amount && newExpense.description) {
      setExpenseEntries([...expenseEntries, { ...newExpense, id: Date.now() }]);
      setNewExpense({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
        receiptId: '',
        category: 'Utilities',
        deductible: true
      });
    }
  };

  const deleteExpenseEntry = (id) => {
    setExpenseEntries(expenseEntries.filter(entry => entry.id !== id));
  };

  const setupEmailReminders = () => {
    if (!emailAddress) return;
    
    const quarters = getQuarterlyPayments();
    const reminders = quarters.map(q => ({
      quarter: q.quarter,
      dueDate: q.dueDate,
      amount: q.amount,
      email: emailAddress,
      status: 'Scheduled',
      id: Date.now() + Math.random()
    }));
    
    setEmailReminders(reminders);
  };

  const exportToCSV = () => {
    if (!results) return;
    
    const csvData = [
      ['T-Axed Tax & Business Report - Studio Ayo', ''],
      ['Generated', new Date().toLocaleDateString('en-NG')],
      ['', ''],
      ['BUSINESS INCOME TRACKING', ''],
      ['Total Tracked Income', results.totalTrackedIncome || 0],
      ['Number of Transactions', incomeEntries.length],
      ['', ''],
      ['INCOME BREAKDOWN', ''],
      ...incomeEntries.map(e => [e.date, e.description, e.amount, e.receiptId, e.client, e.category]),
      ['', ''],
      ['BUSINESS EXPENSES TRACKING', ''],
      ['Total Tracked Expenses', results.totalTrackedExpenses || 0],
      ['Number of Transactions', expenseEntries.length],
      ['', ''],
      ['EXPENSE BREAKDOWN', ''],
      ...expenseEntries.map(e => [e.date, e.description, e.amount, e.receiptId, e.category, e.deductible ? 'Deductible' : 'Non-Deductible']),
      ['', ''],
      ['TAX CALCULATION', ''],
      ['Annual Gross Income', results.annualGross],
      ['Pension (8%)', results.pension],
      ['NHF (2.5%)', results.nhf],
      ['Life Insurance Relief', results.lifeInsuranceRelief],
      ['Rent Relief', results.rentRelief],
      ['Business Expenses', results.totalBusinessExpenses],
      ['Total Deductions', results.totalDeductions],
      ['Net Income', results.netIncome],
      ['Tax-Free Allowance', results.taxFreeAllowance],
      ['Chargeable Income', results.chargeableIncome],
      ['Annual Tax (15%)', results.annualTax],
      ['Monthly Tax', results.monthlyTax],
      ['Monthly Take-Home', results.monthlyTakeHome],
      ['Annual Take-Home', results.annualTakeHome],
      ['Effective Tax Rate', ((results.annualTax / results.annualGross) * 100).toFixed(2) + '%']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `T-Axed_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getQuarterlyPayments = () => {
    if (!results) return [];
    const quarterlyTax = results.annualTax / 4;
    return [
      { quarter: 'Q1 (Jan-Mar)', amount: quarterlyTax, dueDate: 'April 30, 2026', status: 'Due' },
      { quarter: 'Q2 (Apr-Jun)', amount: quarterlyTax, dueDate: 'July 31, 2026', status: 'Upcoming' },
      { quarter: 'Q3 (Jul-Sep)', amount: quarterlyTax, dueDate: 'October 31, 2026', status: 'Upcoming' },
      { quarter: 'Q4 (Oct-Dec)', amount: quarterlyTax, dueDate: 'January 31, 2027', status: 'Upcoming' }
    ];
  };

  const getMultiYearProjection = () => {
    if (!results) return [];
    const years = [];
    const growthRate = 0.10;
    
    for (let i = 0; i < 5; i++) {
      const yearIncome = results.annualGross * Math.pow(1 + growthRate, i);
      const yearPension = yearIncome * 0.08;
      const yearNhf = yearIncome * 0.025;
      const yearMaxLife = yearIncome * 0.20;
      const yearLifeRelief = Math.min(lifePremium, yearMaxLife);
      const yearDeductions = yearPension + yearNhf + yearLifeRelief + results.rentRelief + results.totalBusinessExpenses;
      const yearNet = yearIncome - yearDeductions;
      const yearChargeable = Math.max(0, yearNet - 800000);
      const yearTax = yearChargeable * 0.15;
      const yearTakeHome = yearIncome - yearTax;
      
      years.push({
        year: 2026 + i,
        income: yearIncome,
        tax: yearTax,
        takeHome: yearTakeHome,
        effectiveRate: ((yearTax / yearIncome) * 100).toFixed(1)
      });
    }
    
    return years;
  };

  const getIncomeByCategory = () => {
    const categories = {};
    incomeEntries.forEach(entry => {
      categories[entry.category] = (categories[entry.category] || 0) + parseFloat(entry.amount || 0);
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  const getExpenseByCategory = () => {
    const categories = {};
    expenseEntries.forEach(entry => {
      categories[entry.category] = (categories[entry.category] || 0) + parseFloat(entry.amount || 0);
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const nigerianInsurers = [
    { name: 'AXA Mansard', type: 'Life & Health', api: 'https://api.axamansard.com', status: 'Available' },
    { name: 'Custodian Investment', type: 'Life Insurance', api: 'https://api.custodianplc.com', status: 'Available' },
    { name: 'Leadway Assurance', type: 'Life & Health', api: 'https://api.leadway.com', status: 'Integration Ready' },
    { name: 'AIICO Insurance', type: 'Life Insurance', api: 'https://api.aiicoplc.com', status: 'Available' },
    { name: 'Hygeia HMO', type: 'Health Insurance', api: 'https://api.hygeiahmo.com', status: 'Available' },
    { name: 'Reliance HMO', type: 'Health Insurance', api: 'https://api.reliancehmo.com', status: 'Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-12 h-12 text-white" />
              <div>
                <h1 className="text-4xl font-bold text-white">T-Axed</h1>
                <p className="text-purple-100">by Studio Ayo</p>
                <p className="text-purple-200 text-sm mt-1">NTA 2025 & NTAA 2025 Compliance System</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEmailScheduler(!showEmailScheduler)}
                className="flex items-center gap-2 bg-white text-purple-600 px-4 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Reminders
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-white text-purple-600 px-4 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Email Scheduler */}
        {showEmailScheduler && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-600" />
              Automated Quarterly Email Reminders
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>📧 Auto-Reminder System:</strong> Enter your email to receive automatic reminders 7 days before each quarterly tax payment deadline. 
                  Avoid the ₦100,000 late payment penalty!
                </p>
              </div>

              <div className="flex gap-4">
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="your.email@studioayo.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={setupEmailReminders}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  Schedule Reminders
                </button>
              </div>

              {emailReminders.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-gray-800">✅ Scheduled Email Reminders:</h3>
                  {emailReminders.map((reminder) => (
                    <div key={reminder.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-green-900">{reminder.quarter}</p>
                          <p className="text-sm text-green-700">
                            📅 Reminder: 7 days before {reminder.dueDate}
                          </p>
                          <p className="text-sm text-green-700">
                            💰 Payment Due: {formatCurrency(reminder.amount)}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            📧 Will be sent to: {reminder.email}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                          {reminder.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Income & Expense Tracker Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => setShowIncomeTracker(!showIncomeTracker)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Income Tracker</h3>
                <p className="text-green-100">Log receipts & track revenue</p>
                {results?.totalTrackedIncome > 0 && (
                  <p className="text-3xl font-bold mt-2">{formatCurrency(results.totalTrackedIncome)}</p>
                )}
              </div>
              <Receipt className="w-12 h-12" />
            </div>
          </button>

          <button
            onClick={() => setShowExpenseTracker(!showExpenseTracker)}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Expense Tracker</h3>
                <p className="text-red-100">Log costs & deductions</p>
                {results?.totalTrackedExpenses > 0 && (
                  <p className="text-3xl font-bold mt-2">{formatCurrency(results.totalTrackedExpenses)}</p>
                )}
              </div>
              <FileText className="w-12 h-12" />
            </div>
          </button>
        </div>

        {/* Income Tracker */}
        {showIncomeTracker && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Receipt className="w-6 h-6 text-green-600" />
              Business Income Tracker
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Add Income Entry</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newIncome.date}
                    onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="5000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="Monthly internet subscription"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receipt/Transaction ID</label>
                  <input
                    type="text"
                    value={newExpense.receiptId}
                    onChange={(e) => setNewExpense({...newExpense, receiptId: e.target.value})}
                    placeholder="EXP-2026-001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option>Utilities</option>
                    <option>Software Subscriptions</option>
                    <option>Equipment</option>
                    <option>Marketing</option>
                    <option>Office Supplies</option>
                    <option>Professional Fees</option>
                    <option>Travel</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newExpense.deductible}
                    onChange={(e) => setNewExpense({...newExpense, deductible: e.target.checked})}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Tax Deductible (Wholly & Exclusively for Business)
                  </label>
                </div>

                <button
                  onClick={addExpenseEntry}
                  className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Expense Entry
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Expense Summary</h3>
                {getExpenseByCategory().length > 0 && (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={getExpenseByCategory()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getExpenseByCategory().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="bg-red-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-red-700">Total Expense Entries</p>
                  <p className="text-3xl font-bold text-red-900">{expenseEntries.length}</p>
                  <p className="text-sm text-red-700 mt-2">Deductible Amount</p>
                  <p className="text-2xl font-bold text-red-900">{formatCurrency(results?.totalTrackedExpenses || 0)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Expense Entries ({expenseEntries.length})</h3>
              {expenseEntries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No expense entries yet. Add your first transaction above.</p>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {expenseEntries.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-500 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-lg text-red-600">{formatCurrency(entry.amount)}</span>
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                              {entry.category}
                            </span>
                            {entry.deductible && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                ✓ Deductible
                              </span>
                            )}
                          </div>
                          <p className="text-gray-900 font-medium">{entry.description}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                            <p>📅 {new Date(entry.date).toLocaleDateString('en-NG')}</p>
                            <p>🧾 {entry.receiptId || 'No receipt ID'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteExpenseEntry(entry.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <p className="text-sm text-amber-800">
                <strong>⚖️ Section 20 NTA 2025 Reminder:</strong> Only expenses "wholly and exclusively incurred" for your design business are tax-deductible. 
                Personal expenses like family groceries or non-business meals cannot be deducted. Mark expenses carefully!
              </p>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Income Input */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Manual Income & Business Details
              </h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-sm text-blue-800">
                💡 Tip: Use Income Tracker above for accurate record-keeping. This manual input is a fallback.
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (₦) - {results?.totalTrackedIncome > 0 ? 'Overridden by Tracker' : 'Active'}
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={results?.totalTrackedIncome > 0}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Rent Paid to Family (₦)
                </label>
                <input
                  type="number"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Utilities (₦)
                </label>
                <input
                  type="number"
                  value={monthlyUtilities}
                  onChange={(e) => setMonthlyUtilities(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Usage % (for utilities)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={utilityPercentage}
                  onChange={(e) => setUtilityPercentage(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-purple-600 font-semibold">{utilityPercentage}%</div>
              </div>
            </div>

            {/* Insurance Inputs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Insurance Modules
              </h2>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">Life Insurance (Tax Deductible)</h3>
                    <p className="text-sm text-green-700 mb-2">Section 30(2)(a)(iv) NTA 2025</p>
                    <input
                      type="number"
                      value={lifePremium}
                      onChange={(e) => setLifePremium(Number(e.target.value))}
                      placeholder="Annual premium paid"
                      className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900">Health Insurance (Tracked Only)</h3>
                    <p className="text-sm text-amber-700 mb-2">No explicit NTA 2025 provision - monitoring</p>
                    <input
                      type="number"
                      value={healthPremium}
                      onChange={(e) => setHealthPremium(Number(e.target.value))}
                      placeholder="Annual HMO premium"
                      className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">NHIA (Voluntary Contribution)</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      {results?.nhiaMandatory ? "MANDATORY - You have 3+ employees" : "Voluntary - Track for future"}
                    </p>
                    <input
                      type="number"
                      value={nhiaVoluntary}
                      onChange={(e) => setNhiaVoluntary(Number(e.target.value))}
                      placeholder="Annual NHIA contribution"
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowInsuranceAPI(!showInsuranceAPI)}
                className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                {showInsuranceAPI ? 'Hide' : 'Show'} Insurance Provider APIs
              </button>
            </div>
          </div>
        </div>

        {/* Insurance API Integration Panel */}
        {showInsuranceAPI && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              Nigerian Insurance Provider API Integration
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {nigerianInsurers.map((insurer, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{insurer.name}</h3>
                      <p className="text-sm text-gray-600">{insurer.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      insurer.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {insurer.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 font-mono bg-gray-50 p-2 rounded">{insurer.api}</p>
                  <button className="w-full bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                    Connect & Sync Premiums
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>API Integration Benefits:</strong> Auto-sync premium payments, validate policy status with NAICOM, 
                receive renewal reminders, and export certificates directly to your 7-year vault.
              </p>
            </div>
          </div>
        )}

        {results && (
          <>
            {/* Tax Calculation Results */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-purple-600" />
                Tax Calculation Breakdown
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Annual Gross Income</span>
                  <span className="font-bold text-xl">{formatCurrency(results.annualGross)}</span>
                </div>

                {results.totalTrackedIncome > 0 && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded text-sm">
                    <p className="text-green-800">
                      ✓ Using tracked income from {incomeEntries.length} entries
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Statutory Deductions:</h3>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pension (8%)</span>
                    <span className="text-red-600">-{formatCurrency(results.pension)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">NHF (2.5%)</span>
                    <span className="text-red-600">-{formatCurrency(results.nhf)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      Life Insurance Relief
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </span>
                    <span className="text-red-600">-{formatCurrency(results.lifeInsuranceRelief)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent Relief (20%, capped ₦500k)</span>
                    <span className="text-red-600">-{formatCurrency(results.rentRelief)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Expenses (tracked + utilities)</span>
                    <span className="text-red-600">-{formatCurrency(results.totalBusinessExpenses)}</span>
                  </div>
                  
                  {results.totalTrackedExpenses > 0 && (
                    <div className="bg-red-50 border-l-2 border-red-300 pl-3 py-1 text-sm">
                      <p className="text-red-700">
                        Includes {formatCurrency(results.totalTrackedExpenses)} from {expenseEntries.filter(e => e.deductible).length} tracked expenses
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-2 border-t border-gray-300 font-semibold">
                    <span>Total Deductions</span>
                    <span className="text-red-600">-{formatCurrency(results.totalDeductions)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 font-semibold">Net Income</span>
                  <span className="font-bold text-lg">{formatCurrency(results.netIncome)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Less: Tax-Free Allowance</span>
                  <span className="text-green-600">-{formatCurrency(results.taxFreeAllowance)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b bg-purple-50 rounded-lg px-4">
                  <span className="text-purple-900 font-semibold">Chargeable Income</span>
                  <span className="font-bold text-xl text-purple-600">{formatCurrency(results.chargeableIncome)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700">Tax @ 15%</span>
                  <span className="text-red-600 font-bold">{formatCurrency(results.annualTax)}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 font-semibold">Monthly Tax Liability</span>
                  <span className="text-red-600 font-bold text-xl">{formatCurrency(results.monthlyTax)}</span>
                </div>
              </div>
            </div>

            {/* Take Home & Optimization */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Take Home */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-7 h-7" />
                  Your Take-Home Amount
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-green-100 text-sm mb-1">Monthly Take-Home</p>
                    <p className="text-5xl font-bold">{formatCurrency(results.monthlyTakeHome)}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-green-400">
                    <p className="text-green-100 text-sm mb-1">Annual Take-Home</p>
                    <p className="text-3xl font-bold">{formatCurrency(results.annualTakeHome)}</p>
                  </div>

                  <div className="pt-4 border-t border-green-400">
                    <p className="text-green-100 text-sm mb-1">Effective Tax Rate</p>
                    <p className="text-2xl font-bold">
                      {((results.annualTax / results.annualGross) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Optimization Calculator */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  Insurance Optimization
                </h2>

                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-700 mb-2">Life Insurance Cap (20% of gross)</p>
                    <p className="text-2xl font-bold text-purple-900">{formatCurrency(results.maxLifeRelief)}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 mb-2">Currently Using</p>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.lifeInsuranceRelief)}</p>
                  </div>

                  {results.lifeInsuranceUnused > 0 && (
                    <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4">
                      <p className="text-sm text-amber-700 mb-2 font-semibold">💡 Optimization Opportunity</p>
                      <p className="text-gray-700 mb-2">
                        You can increase life insurance by <span className="font-bold">{formatCurrency(results.lifeInsuranceUnused)}</span>
                      </p>
                      <p className="text-green-700 font-bold">
                        Potential Annual Tax Savings: {formatCurrency(results.potentialTaxSavings)}
                      </p>
                      <p className="text-green-600 text-sm">
                        (Monthly: {formatCurrency(results.potentialTaxSavings / 12)})
                      </p>
                    </div>
                  )}

                  {results.lifeInsuranceUnused === 0 && lifePremium > 0 && (
                    <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
                      <p className="text-green-700 font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Life Insurance Fully Optimized!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quarterly Payment Scheduler */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  Quarterly Estimated Tax Payment Scheduler
                </h2>
                <button
                  onClick={() => setShowQuarterly(!showQuarterly)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {showQuarterly ? 'Hide' : 'Show'} Schedule
                </button>
              </div>

              {showQuarterly && (
                <div className="space-y-3">
                  {getQuarterlyPayments().map((payment, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${payment.status === 'Due' ? 'bg-red-500' : 'bg-gray-300'}`} />
                          <div>
                            <h3 className="font-semibold text-gray-900">{payment.quarter}</h3>
                            <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-gray-500">{payment.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                    <p className="text-sm text-red-800">
                      <strong>⚠️ Penalty Alert:</strong> Late quarterly payments attract ₦100,000 penalty under NTAA 2025. 
                      Set calendar reminders or use Email Scheduler above!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Multi-Year Comparison Chart */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  5-Year Tax Projection (10% Annual Growth)
                </h2>
                <button
                  onClick={() => setShowMultiYear(!showMultiYear)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {showMultiYear ? 'Hide' : 'Show'} Projection
                </button>
              </div>

              {showMultiYear && (
                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getMultiYearProjection()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#8b5cf6" strokeWidth={2} name="Gross Income" />
                      <Line type="monotone" dataKey="tax" stroke="#ef4444" strokeWidth={2} name="Annual Tax" />
                      <Line type="monotone" dataKey="takeHome" stroke="#10b981" strokeWidth={2} name="Take-Home" />
                    </LineChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getMultiYearProjection()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="income" fill="#8b5cf6" name="Gross Income" />
                      <Bar dataKey="tax" fill="#ef4444" name="Tax Paid" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="grid md:grid-cols-5 gap-4">
                    {getMultiYearProjection().map((year) => (
                      <div key={year.year} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-bold text-purple-600 text-lg mb-2">{year.year}</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-gray-600">Income</p>
                            <p className="font-semibold">{formatCurrency(year.income)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tax</p>
                            <p className="font-semibold text-red-600">{formatCurrency(year.tax)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Take-Home</p>
                            <p className="font-semibold text-green-600">{formatCurrency(year.takeHome)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Eff. Rate</p>
                            <p className="font-semibold">{year.effectiveRate}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Planning Insight:</strong> With 10% annual income growth, your tax liability will increase from{' '}
                      {formatCurrency(results.annualTax)} to {formatCurrency(getMultiYearProjection()[4].tax)} by 2030. 
                      Consider maximizing life insurance deductions each year to optimize your effective tax rate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Annual Review Alerts */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-purple-600" />
                Annual Review & Compliance Alerts
              </h2>

              <div className="space-y-4">
                {results.healthPremium > 0 && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-900">Health Insurance Tracking</h3>
                      <p className="text-sm text-amber-800 mt-1">
                        You're paying {formatCurrency(results.healthPremium)}/year in health insurance. 
                        This is NOT currently tax-deductible under NTA 2025, but is being tracked for future legislation updates.
                      </p>
                      <p className="text-xs text-amber-700 mt-2">
                        ⚠️ System will alert you if NRS issues guidance on health insurance deductibility
                      </p>
                    </div>
                  </div>
                )}

                {results.nhiaMandatory && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900">NHIA Registration Required</h3>
                      <p className="text-sm text-red-800 mt-1">
                        You have {employeeCount} employees. NHIA registration is MANDATORY for businesses with 3+ employees.
                      </p>
                      <p className="text-xs text-red-700 mt-2">
                        Required contribution: 10% (5% employer + 5% employee) on basic salary
                      </p>
                    </div>
                  </div>
                )}

                {!results.nhiaMandatory && results.nhiaVoluntary > 0 && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900">NHIA Voluntary Contribution</h3>
                      <p className="text-sm text-blue-800 mt-1">
                        You're making voluntary NHIA contributions of {formatCurrency(results.nhiaVoluntary)}/year.
                        Tax treatment is unclear - consult tax advisor for deductibility.
                      </p>
                    </div>
                  </div>
                )}

                {rentPaid > 0 && (
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-purple-900">Related-Party Transaction Alert</h3>
                      <p className="text-sm text-purple-800 mt-1">
                        You're claiming rent relief on payments to family. Ensure you have:
                      </p>
                      <ul className="text-xs text-purple-700 mt-2 space-y-1 ml-4 list-disc">
                        <li>Formal lease agreement at market rate</li>
                        <li>Bank transfer proof (no cash)</li>
                        <li>Confirmation family member declares rental income</li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Document Retention Compliant</h3>
                    <p className="text-sm text-green-800 mt-1">
                      System configured for 7-year retention of all receipts, insurance policies, and payment proofs.
                      This exceeds the NTAA 2025 requirement and protects against ₦10,000 record-keeping penalties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                    placeholder="50000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newIncome.description}
                    onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                    placeholder="Logo design for ABC Company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Receipt/Transaction ID</label>
                  <input
                    type="text"
                    value={newIncome.receiptId}
                    onChange={(e) => setNewIncome({...newIncome, receiptId: e.target.value})}
                    placeholder="RCP-2026-001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    value={newIncome.client}
                    onChange={(e) => setNewIncome({...newIncome, client: e.target.value})}
                    placeholder="ABC Company Ltd"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newIncome.category}
                    onChange={(e) => setNewIncome({...newIncome, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option>Design Services</option>
                    <option>Branding</option>
                    <option>Web Development</option>
                    <option>Consulting</option>
                    <option>Print Design</option>
                    <option>Other</option>
                  </select>
                </div>

                <button
                  onClick={addIncomeEntry}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Income Entry
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Income Summary</h3>
                {getIncomeByCategory().length > 0 && (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={getIncomeByCategory()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getIncomeByCategory().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-700">Total Income Entries</p>
                  <p className="text-3xl font-bold text-green-900">{incomeEntries.length}</p>
                  <p className="text-sm text-green-700 mt-2">Total Amount</p>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(results?.totalTrackedIncome || 0)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Income Entries ({incomeEntries.length})</h3>
              {incomeEntries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No income entries yet. Add your first transaction above.</p>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {incomeEntries.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-lg text-green-600">{formatCurrency(entry.amount)}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                              {entry.category}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium">{entry.description}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                            <p>📅 {new Date(entry.date).toLocaleDateString('en-NG')}</p>
                            <p>🧾 {entry.receiptId || 'No receipt ID'}</p>
                            <p>👤 {entry.client || 'No client'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteIncomeEntry(entry.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expense Tracker */}
        {showExpenseTracker && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-red-600" />
              Business Expense Tracker
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Add Expense Entry</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                  <input
                    type="number"
                