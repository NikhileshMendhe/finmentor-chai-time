
import React from 'react';
import { Lightbulb, TrendingUp, Shield, PiggyBank, CreditCard, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinanceTips = () => {
  const tips = [
    {
      icon: PiggyBank,
      title: "50-30-20 Rule",
      content: "Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment. It's like having three different piggy banks!",
      category: "Budgeting"
    },
    {
      icon: TrendingUp,
      title: "Start SIP Early",
      content: "Even ₹1000/month SIP started at 25 can become ₹1.5 crores by retirement. Time is your best friend in investing!",
      category: "Investment"
    },
    {
      icon: Shield,
      title: "Emergency Fund",
      content: "Keep 6-12 months of expenses in a liquid fund. Think of it as your financial umbrella for rainy days.",
      category: "Planning"
    },
    {
      icon: CreditCard,
      title: "Credit Card Wisdom",
      content: "Pay full amount before due date. Using only 30% of credit limit boosts your CIBIL score. Smart spending = smart borrowing!",
      category: "Credit"
    },
    {
      icon: FileText,
      title: "Tax Planning",
      content: "Don't wait for March! Plan taxes in April itself. ELSS, PPF, NPS - these aren't just tax savers, they're wealth builders.",
      category: "Tax"
    },
    {
      icon: TrendingUp,
      title: "Diversify Like a Pro",
      content: "Don't put all eggs in one basket. Mix equity, debt, gold, and real estate. Balance is the key to long-term wealth.",
      category: "Investment"
    }
  ];

  const dailyTip = tips[new Date().getDay() % tips.length];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-purple-400" size={24} />
          Daily Finance Tips
        </h2>

        {/* Today's Spotlight Tip */}
        <Card className="bg-gradient-to-r from-purple-900 to-purple-800 border-purple-600 mb-6">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <dailyTip.icon className="text-purple-300" size={20} />
              Today's Spotlight: {dailyTip.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-100">{dailyTip.content}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-purple-700 text-purple-200 text-xs rounded-full">
              {dailyTip.category}
            </span>
          </CardContent>
        </Card>

        {/* All Tips */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">More Financial Wisdom</h3>
          {tips.map((tip, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-purple-400 flex items-center gap-2 text-base">
                  <tip.icon size={18} />
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed">{tip.content}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                  {tip.category}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-800 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-purple-400 text-base">💡 Pro Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm">
              Bookmark one tip each week and implement it. Small consistent changes lead to big financial wins! 
              Remember: It's not about being perfect, it's about being consistent.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceTips;
