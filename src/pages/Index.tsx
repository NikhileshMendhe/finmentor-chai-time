
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import FinMentorChat from '@/components/FinMentorChat';
import FinancialCalculators from '@/components/FinancialCalculators';
import FinanceTips from '@/components/FinanceTips';
import TaxChecklist from '@/components/TaxChecklist';

const Index = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [currentPersona, setCurrentPersona] = useState('ca');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'chat':
        return (
          <FinMentorChat
            onPersonaChange={setCurrentPersona}
            currentPersona={currentPersona}
          />
        );
      case 'calculators':
        return <FinancialCalculators />;
      case 'tips':
        return <FinanceTips />;
      case 'documents':
        return <TaxChecklist />;
      default:
        return (
          <FinMentorChat
            onPersonaChange={setCurrentPersona}
            currentPersona={currentPersona}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex w-full">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="flex-1 bg-gray-900">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Index;
