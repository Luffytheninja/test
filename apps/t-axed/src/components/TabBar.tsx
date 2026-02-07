import { LayoutDashboard, Receipt, TrendingUp, UserCircle } from 'lucide-react';

export type TabType = 'dashboard' | 'tracking' | 'optimization' | 'profile';

interface TabBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Summary', icon: LayoutDashboard },
    { id: 'tracking', label: 'Tracking', icon: Receipt },
    { id: 'optimization', label: 'Strategy', icon: TrendingUp },
    { id: 'profile', label: 'Business', icon: UserCircle },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-item ${isActive ? 'tab-item-active' : 'tab-item-inactive'}`}
          >
            <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
            </div>
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
