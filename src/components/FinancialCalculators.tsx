
import React, { useState } from 'react';
import { Calculator, TrendingUp, Target, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FinancialCalculators = () => {
  const [sipData, setSipData] = useState({
    monthlyAmount: '',
    rate: '12',
    years: '10'
  });

  const [taxData, setTaxData] = useState({
    income: '',
    deductions: ''
  });

  const [savingsData, setSavingsData] = useState({
    targetAmount: '',
    currentSavings: '',
    timeframe: ''
  });

  const [sipResult, setSipResult] = useState<number | null>(null);
  const [taxResult, setTaxResult] = useState<number | null>(null);
  const [savingsResult, setSavingsResult] = useState<number | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(sipData.monthlyAmount);
    const r = parseFloat(sipData.rate) / 100 / 12;
    const n = parseFloat(sipData.years) * 12;
    
    if (P && r && n) {
      const maturityAmount = P * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
      setSipResult(Math.round(maturityAmount));
    }
  };

  const calculateTax = () => {
    const income = parseFloat(taxData.income);
    const deductions = parseFloat(taxData.deductions);
    
    if (income) {
      const taxableIncome = income - (deductions || 0);
      let tax = 0;
      
      // Simplified tax calculation for demonstration
      if (taxableIncome > 1000000) {
        tax = (taxableIncome - 1000000) * 0.3 + 150000;
      } else if (taxableIncome > 500000) {
        tax = (taxableIncome - 500000) * 0.2 + 50000;
      } else if (taxableIncome > 300000) {
        tax = (taxableIncome - 300000) * 0.1;
      }
      
      setTaxResult(Math.round(tax));
    }
  };

  const calculateSavingsGoal = () => {
    const target = parseFloat(savingsData.targetAmount);
    const current = parseFloat(savingsData.currentSavings);
    const timeframe = parseFloat(savingsData.timeframe);
    
    if (target && timeframe) {
      const remaining = target - (current || 0);
      const monthlyRequired = remaining / (timeframe * 12);
      setSavingsResult(Math.round(monthlyRequired));
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calculator className="text-purple-400" size={24} />
          Financial Calculators
        </h2>
        
        <Tabs defaultValue="sip" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-700">
            <TabsTrigger value="sip" className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              SIP Calculator
            </TabsTrigger>
            <TabsTrigger value="tax" className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Tax Calculator
            </TabsTrigger>
            <TabsTrigger value="savings" className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Savings Goal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sip" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <TrendingUp size={20} />
                  SIP Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="monthly-amount" className="text-gray-300">Monthly Investment (₹)</Label>
                  <Input
                    id="monthly-amount"
                    value={sipData.monthlyAmount}
                    onChange={(e) => setSipData({...sipData, monthlyAmount: e.target.value})}
                    placeholder="5000"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rate" className="text-gray-300">Expected Annual Return (%)</Label>
                  <Input
                    id="rate"
                    value={sipData.rate}
                    onChange={(e) => setSipData({...sipData, rate: e.target.value})}
                    placeholder="12"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="years" className="text-gray-300">Investment Period (Years)</Label>
                  <Input
                    id="years"
                    value={sipData.years}
                    onChange={(e) => setSipData({...sipData, years: e.target.value})}
                    placeholder="10"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <Button onClick={calculateSIP} className="w-full bg-purple-600 hover:bg-purple-700">
                  Calculate Maturity Amount
                </Button>
                {sipResult && (
                  <div className="p-4 bg-purple-900 rounded-lg">
                    <p className="text-purple-200">Maturity Amount: <span className="text-white font-bold">₹{sipResult.toLocaleString()}</span></p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Receipt size={20} />
                  Income Tax Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="income" className="text-gray-300">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    value={taxData.income}
                    onChange={(e) => setTaxData({...taxData, income: e.target.value})}
                    placeholder="600000"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="deductions" className="text-gray-300">Total Deductions (₹)</Label>
                  <Input
                    id="deductions"
                    value={taxData.deductions}
                    onChange={(e) => setTaxData({...taxData, deductions: e.target.value})}
                    placeholder="150000"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <Button onClick={calculateTax} className="w-full bg-purple-600 hover:bg-purple-700">
                  Calculate Tax
                </Button>
                {taxResult !== null && (
                  <div className="p-4 bg-purple-900 rounded-lg">
                    <p className="text-purple-200">Estimated Tax: <span className="text-white font-bold">₹{taxResult.toLocaleString()}</span></p>
                    <p className="text-sm text-purple-300 mt-1">*Simplified calculation for demo</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-4 mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Target size={20} />
                  Savings Goal Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="target" className="text-gray-300">Target Amount (₹)</Label>
                  <Input
                    id="target"
                    value={savingsData.targetAmount}
                    onChange={(e) => setSavingsData({...savingsData, targetAmount: e.target.value})}
                    placeholder="1000000"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="current" className="text-gray-300">Current Savings (₹)</Label>
                  <Input
                    id="current"
                    value={savingsData.currentSavings}
                    onChange={(e) => setSavingsData({...savingsData, currentSavings: e.target.value})}
                    placeholder="100000"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe" className="text-gray-300">Time to Achieve (Years)</Label>
                  <Input
                    id="timeframe"
                    value={savingsData.timeframe}
                    onChange={(e) => setSavingsData({...savingsData, timeframe: e.target.value})}
                    placeholder="5"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <Button onClick={calculateSavingsGoal} className="w-full bg-purple-600 hover:bg-purple-700">
                  Calculate Monthly Savings
                </Button>
                {savingsResult && (
                  <div className="p-4 bg-purple-900 rounded-lg">
                    <p className="text-purple-200">Monthly Savings Required: <span className="text-white font-bold">₹{savingsResult.toLocaleString()}</span></p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialCalculators;
