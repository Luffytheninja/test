import { useState } from 'react';
import { Mail, Bell } from 'lucide-react';
import { formatCurrency } from '../utils';
import { TaxResults, EmailReminder } from '../types';

interface EmailSchedulerProps {
  results: TaxResults;
}

export default function EmailScheduler({ results }: EmailSchedulerProps) {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailReminders, setEmailReminders] = useState<EmailReminder[]>([]);

  // NOTE: In the original App, the toggle was in the Header.
  // I will assume this component is ALWAYS rendered but might be hidden, OR the parent controls visibility.
  // The User asked to refactor. Best practice: The toggle button is in the Header, the content is here.
  // So I'll export the Panel, and maybe the Button separate?
  // Let's make this component just the Panel, and render it conditionally in App.

  const getQuarterlyPayments = () => {
    if (!results) return [];
    const quarterlyTax = results.annualTax / 4;
    return [
      { quarter: 'Q1 (Jan-Mar)', amount: quarterlyTax, dueDate: 'April 30, 2026', status: 'Due' },
      {
        quarter: 'Q2 (Apr-Jun)',
        amount: quarterlyTax,
        dueDate: 'July 31, 2026',
        status: 'Upcoming',
      },
      {
        quarter: 'Q3 (Jul-Sep)',
        amount: quarterlyTax,
        dueDate: 'October 31, 2026',
        status: 'Upcoming',
      },
      {
        quarter: 'Q4 (Oct-Dec)',
        amount: quarterlyTax,
        dueDate: 'January 31, 2027',
        status: 'Upcoming',
      },
    ];
  };

  const setupEmailReminders = () => {
    if (!emailAddress) return;

    const quarters = getQuarterlyPayments();
    const reminders = quarters.map((q) => ({
      quarter: q.quarter,
      dueDate: q.dueDate,
      amount: q.amount,
      email: emailAddress,
      status: 'Scheduled',
      id: Date.now() + Math.random(),
    }));

    setEmailReminders(reminders);
  };

  return (
    <div className="ios-card p-8 mb-8">
      <h2 className="ios-section-header flex items-center gap-2">
        <Mail className="w-6 h-6 text-indigo-600" />
        Email Notifications
      </h2>

      <div className="space-y-6">
        <div className="bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>📧 Smart Reminders:</strong> Receive automatic notifications 7 days before each
            deadline to avoid penalties.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="your.email@studioayo.com"
              className="ios-input"
            />
          </div>
          <button onClick={setupEmailReminders} className="ios-btn-primary px-8">
            <Bell className="w-5 h-5" />
            Set Schedule
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
  );
}
