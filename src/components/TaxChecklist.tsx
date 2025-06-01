
import React, { useState } from 'react';
import { FileText, CheckCircle, Circle, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const TaxChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const checklistSections = [
    {
      title: "Income Documents",
      icon: FileText,
      items: [
        "Form 16 from employer",
        "Bank interest certificates",
        "Dividend statements",
        "Rental income receipts",
        "Capital gains statements",
        "Other income proofs"
      ]
    },
    {
      title: "Investment Proofs",
      icon: CheckCircle,
      items: [
        "ELSS mutual fund statements",
        "PPF account statements",
        "NSC certificates",
        "ULIP premium receipts",
        "NPS contributions",
        "Life insurance premiums"
      ]
    },
    {
      title: "Deduction Documents",
      icon: Circle,
      items: [
        "Home loan interest certificate",
        "Medical insurance premiums",
        "Education loan interest",
        "Donations (80G receipts)",
        "House rent receipts",
        "Medical expenses (parents)"
      ]
    }
  ];

  const handleItemCheck = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalItems = checklistSections.reduce((total, section) => total + section.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="text-purple-400" size={24} />
          Tax Filing Checklist
        </h2>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-purple-900 to-purple-800 border-purple-600 mb-6">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center justify-between">
              <span>Filing Progress</span>
              <span className="text-2xl font-bold">{completionPercentage}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-purple-700 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-purple-200 text-sm">
              {completedItems} of {totalItems} documents collected
            </p>
            <div className="flex items-center mt-2 text-purple-300">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm">Filing deadline: July 31, 2024</span>
            </div>
          </CardContent>
        </Card>

        {/* Checklist Sections */}
        <div className="space-y-4">
          {checklistSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <section.icon size={20} />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    const isChecked = checkedItems[key] || false;
                    
                    return (
                      <div 
                        key={itemIndex}
                        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleItemCheck(sectionIndex, itemIndex)}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handleItemCheck(sectionIndex, itemIndex)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <span className={`text-sm ${
                          isChecked ? 'text-gray-400 line-through' : 'text-gray-300'
                        }`}>
                          {item}
                        </span>
                        {isChecked && (
                          <CheckCircle size={16} className="text-green-500 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            <Download className="mr-2" size={16} />
            Download Complete Checklist
          </Button>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-purple-400 font-medium mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Start collecting documents from April itself</li>
                <li>• Keep digital copies as backup</li>
                <li>• Verify all details before submission</li>
                <li>• File early to avoid last-minute rush</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaxChecklist;
