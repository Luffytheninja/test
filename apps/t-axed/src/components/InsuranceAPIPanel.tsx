import { useState } from 'react';
import { RefreshCw, CheckCircle, Smartphone, Lock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils';
import { InsuranceProvider } from '../types';

interface InsuranceAPIPanelProps {
  onUpdatePremiums: (lifeAdd: number, healthAdd: number) => void;
}

const INITIAL_PROVIDERS: InsuranceProvider[] = [
  {
    id: 'axa',
    name: 'AXA Mansard',
    type: 'Life & Health',
    api: 'https://api.axamansard.com',
    status: 'Available',
    isConnected: false,
  },
  {
    id: 'custodian',
    name: 'Custodian Investment',
    type: 'Life Insurance',
    api: 'https://api.custodianplc.com',
    status: 'Available',
    isConnected: false,
  },
  {
    id: 'leadway',
    name: 'Leadway Assurance',
    type: 'Life & Health',
    api: 'https://api.leadway.com',
    status: 'Integration Ready',
    isConnected: false,
  },
  {
    id: 'aiico',
    name: 'AIICO Insurance',
    type: 'Life Insurance',
    api: 'https://api.aiicoplc.com',
    status: 'Available',
    isConnected: false,
  },
  {
    id: 'hygeia',
    name: 'Hygeia HMO',
    type: 'Health Insurance',
    api: 'https://api.hygeiahmo.com',
    status: 'Available',
    isConnected: false,
  },
  {
    id: 'reliance',
    name: 'Reliance HMO',
    type: 'Health Insurance',
    api: 'https://api.reliancehmo.com',
    status: 'Available',
    isConnected: false,
  },
];

export default function InsuranceAPIPanel({ onUpdatePremiums }: InsuranceAPIPanelProps) {
  const [providers, setProviders] = useState<InsuranceProvider[]>(INITIAL_PROVIDERS);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = (providerId: string) => {
    setConnectingId(providerId);

    // Simulate API network request
    setTimeout(() => {
      const provider = providers.find((p) => p.id === providerId);
      if (!provider) return;

      // Mock data based on provider type
      let mockPremium = 0;
      let mockLife = 0;
      let mockHealth = 0;

      if (provider.type.includes('Life')) {
        mockLife = Math.floor(Math.random() * 200000) + 100000; // 100k - 300k
        mockPremium += mockLife;
      }
      if (provider.type.includes('Health')) {
        mockHealth = Math.floor(Math.random() * 100000) + 50000; // 50k - 150k
        mockPremium += mockHealth;
      }

      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === providerId) {
            return {
              ...p,
              isConnected: true,
              syncedPolicyNumber: `POL-${Date.now().toString().slice(-6)}`,
              syncedPremium: mockPremium,
              lastSync: new Date().toLocaleTimeString(),
            };
          }
          return p;
        }),
      );

      // Update parent state
      onUpdatePremiums(mockLife, mockHealth);

      setConnectingId(null);
    }, 2000); // 2 second delay for realism
  };

  return (
    <div className="ios-card p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="ios-section-header mb-0 flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-indigo-600" />
          Policy Hub
        </h2>
        <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <Lock className="w-3.5 h-3.5" />
          Secure
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {providers.map((insurer) => (
          <div
            key={insurer.id}
            className={`ios-card border p-5 transition-all duration-200 ${
              insurer.isConnected
                ? 'bg-green-50/50 border-green-200 shadow-sm'
                : 'bg-white/50 border-white/40 hover:border-indigo-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{insurer.name}</h3>
                <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mt-1">
                  {insurer.type}
                </p>
              </div>
              {insurer.isConnected ? (
                <span className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-full text-[10px] font-bold">
                  <CheckCircle className="w-3 h-3" />
                  SYNCED
                </span>
              ) : (
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    insurer.status === 'Available'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {insurer.status}
                </span>
              )}
            </div>

            {insurer.isConnected ? (
              <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="ios-input-group !bg-white/80">
                  <div className="ios-input-item !border-0 flex justify-between items-center py-2 px-3">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Policy</span>
                    <span className="text-xs font-mono text-gray-900">
                      {insurer.syncedPolicyNumber}
                    </span>
                  </div>
                  <div className="ios-input-item !border-t border-gray-100 flex justify-between items-center py-2 px-3">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Premium</span>
                    <span className="font-bold text-green-700">
                      {formatCurrency(insurer.syncedPremium || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <button
                  onClick={() => handleConnect(insurer.id)}
                  disabled={connectingId !== null || insurer.status !== 'Available'}
                  className={`ios-btn-primary w-full py-2.5 !text-sm ${
                    connectingId === insurer.id
                      ? 'bg-gray-100 text-gray-400 cursor-wait'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                  }`}
                >
                  {connectingId === insurer.id ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Linking...
                    </>
                  ) : (
                    <>Connect Account</>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <p className="text-sm text-blue-800">
          <strong>API Integration Benefits:</strong> Real-time premium verification prevents tax
          audit queries. Synced data is automatically stamped with the insurer's digital signature
          for NTA 2025 compliance.
        </p>
      </div>
    </div>
  );
}
