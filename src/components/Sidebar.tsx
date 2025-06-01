
import React from 'react';
import { Calculator, Lightbulb, FileText, Search, Upload, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'chat', label: 'FinMentor Chat', icon: HelpCircle },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'tips', label: 'Finance Tips', icon: Lightbulb },
    { id: 'documents', label: 'Tax Checklist', icon: FileText },
  ];

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-2">
          <span className="text-purple-400">Fin</span>Mentor
        </h1>
        <p className="text-gray-400 text-sm">Your friendly CA companion</p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search finance terms..."
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeSection === item.id
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="mr-3" size={18} />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 p-3 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Button size="sm" variant="outline" className="w-full text-xs border-gray-600 text-gray-300 hover:bg-gray-600">
              <Upload size={14} className="mr-2" />
              Upload Documents
            </Button>
            <Button size="sm" variant="outline" className="w-full text-xs border-gray-600 text-gray-300 hover:bg-gray-600">
              <Calculator size={14} className="mr-2" />
              Quick Calculator
            </Button>
          </div>
        </div>

        {/* Status Card */}
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg">
          <h3 className="text-sm font-medium text-purple-200 mb-1">AI Status</h3>
          <p className="text-xs text-purple-300">Connected & Ready</p>
          <div className="flex items-center mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-purple-300">Gemini AI Active</span>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Made with 💜 for financial education
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
